const express = require('express');
const mongo = require('mongodb');
const rabbit = require('./submodules/rabbit_sender');
const rabbit_conn = require('./submodules/rabbit_connection');
const dataBase = require('./submodules/db.js');

const app = express();
var client;
var rabbit_client;

var flag = false;

dataBase.mongo_init()
  .then(res => {
    client = res;
    rabbit_conn.connect_rabbitmq()
      .then(rabbit_res => {
          rabbit_client = rabbit_res;
          startWorker(rabbit_client, client);
          app.listen(3000, () => {
            console.log('server started');
          });
        }
      )
  })
  // Optionally catch and log any errors
  .catch(err => console.log(err));



app.get('/query/:country/:state/:city/:borough', (req, res) => {
  let params = [req.params.country, req.params.state, req.params.city, req.params.borough];

  dataBase.search_document(params, client)
    .then(resp => {
      if (resp == null) {
        // Status: Processing
        res.status(102).end();

        let message = params.toString();

        rabbit.produce(message, rabbit_client)

      } else {
        res.status(200).send(resp);
      }
    })
    // Optionally catch and log any errors
    .catch(err => console.log(err));
  //rabbit.produce()
});

app.get('/query_id/:doc_id', (req, res) => {
  let params = req.params.doc_id;

  dataBase.search_document_by_id(params, client)
    .then(resp => {
      if (resp == null) {
        res.status(400).end()
      } else {
        res.status(200).json(resp);
      }
    })
    // Optionally catch and log any errors
    .catch(err => {
      console.log(err);
      res.status(400).end();
    });
  //rabbit.produce()
});


async function startWorker(rabbit_client, mongo_client) {
  let ch = await rabbit_client.createChannel();
  ch.prefetch(1);
  ch.consume("data-generated", function (msg) {

    console.log(msg.content.toString());

    let message = msg.content.toString();

    dataBase.add_document(message, mongo_client)
      .then(res => {
        ch.ack(msg)
      });

  }, {
    noAck: false
  });
  console.log("Worker is started");
};