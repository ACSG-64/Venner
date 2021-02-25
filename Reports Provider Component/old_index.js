const express = require('express');
const mongo = require('mongodb');
var events = require('events');
const rabbit = require('./submodules/rabbit_sender');
const rabbit_conn = require('./submodules/rabbit_connection');
const dataBase = require('./submodules/db.js');
const reportPipeline = require('./submodules/add_report_pipeline.js')

const app = express();
var db_client;
var rabbit_client;

dataBase.mongo_init()
  .then(res => {
    db_client = res;
    rabbit_conn.connect_rabbitmq()
      .then(rabbit_res => {
        rabbit_client = rabbit_res;
        startWorker(rabbit_client, db_client);
        app.listen(3000, () => {
          console.log('server started');
        });
      })
  })
  // Optionally catch and log any errors
  .catch(err => console.log(err));

app.get('/retreive/:user_id', (req, res) => {
  let params = req.params.user_id;

  dataBase.search_reports(params, db_client)
    .then(resp => {
      if (resp.length == 0) {
        res.send("No reports found");
      } else {
        res.send(resp);
      }
    })
    // Optionally catch and log any errors
    .catch(err => console.log(err));
  //rabbit.produce()
});

// GET BY ID

app.get('/create_rep/:user_id/:data_frame_id', (req, res) => {
  //let params = [req.params.user_id, req.params.data_frame_id];

  let params = {user_id: req.params.user_id, df_id: req.params.data_frame_id }

  // dataBase.add_document(params[1], params[0], db_client)
  reportPipeline.add_report(params, db_client, dataBase)
    .then(status => {
      if ((status[0] == false) && (status[1] == true)) {
        let message = params.df_id;
        rabbit.produce(message, rabbit_client);
        res.send("The report is being generating");
      } else if ((status[0] == true) && (status[1] == false)) {
        res.send("The report file is being generating");
      } else if ((status[0] == true) && (status[1] == true)) {
        res.send("User added");
      } else {
        res.send("Invalid parameters");
      }
    });
});

app.post('/delete_rep/:user_id/:data_frame_id', (req, res) => {
  let params = {user_id: req.params.user_id, data_frame_id: req.params.data_frame_id};
  //[req.params.user_id, req.params.data_frame_id];

  dataBase.remove_document_user(params, db_client)
    .then(status => {

      if (status == true) {
        dataBase.search_reports(params, db_client)
          .then(resp => {
            if (resp.length == 0) {
              res.send("No reports found");
            } else {
              res.send(resp);
            }
          })
          // Optionally catch and log any errors
          .catch(err => console.log(err));
      } else {
        res.send("Error");
      }
    })
});


async function startWorker(rabbit_client, mongo_client) {
  let ch = await rabbit_client.createChannel();
  ch.prefetch(1);
  ch.consume("report-generated", function (msg) {

    console.log((msg.content.toString()));

    let message = msg.content.toString().split(",");

    console.log(message[1]);

    dataBase.update_document_rep(message, mongo_client)
      .then(res => {
        if (res == true) {
          ch.ack(msg);
        } else {
          ch.noAck(msg);
        }
      });

  }, {
    noAck: false
  });
  console.log("Worker is started");
};
