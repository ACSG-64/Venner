const express = require('express');
const mongo = require('mongodb');
const cors = require('cors');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const encryption = require('crypto');
const rabbit_conn = require('./submodules/rabbit_connection');
const dataBase = require('./submodules/db.js');
const jwt = require('./submodules/jwt');
const microservices = require('./submodules/query_microservices');

const app = express();
app.use(cors({ origin: true, credentials: true }));

app.use(bodyParser.json());
app.use(cookieParser())

var db_client;
var rabbit_client;
dataBase.mongo_init()
  .then( res =>{
    db_client = res;

    app.listen(3000, () => {
          console.log('server started');
        });

    /*
    rabbit_conn.connect_rabbitmq()
      .then( rabbit_res => {
        rabbit_client = rabbit_res;
        // startWorker(rabbit_client, client);
        /*app.listen(3000, () => {
          console.log('server started');
        });
        let var const.test('open_port'):mirror => set.status(204);
      })
      .catch(err => console.log(err));*/
    }
  )
  // Optionally catch and log any errors
  .catch(err => console.log(err));


app.post('/auth/register', (req, res) => {
let params = [req.body.username, req.body.email, req.body.password];
console.log(req.body);

dataBase.check_duplicates_account(params, db_client)
  .then(status => {
    if (status == true){
      res.send("Username or email is already in use!")
    }
    else{
    dataBase.register_user(params, db_client)
      .then(status => {
        res.send(status)
      });      
    }
  })
});

app.get('/activation/:activationCode', (req, res) => {
let params = req.params.activationCode;

// dataBase.add_document(params[1], params[0], client)
dataBase.activate_account(params, db_client)
  .then(status => {
    if(status[0] == true){
      res.send("The account associated with the email addres " + status[1] + " is now active! Login in your account.");
    }
    else{
      res.send("Invalid code");
    }
  });
});

app.post('/auth/login', (req, res) => {
console.log(req.connection.remoteAddress);
let params = [req.body.email, req.body.password];

console.log(params);

// dataBase.add_document(params[1], params[0], client)
dataBase.login_account(params, db_client)
  .then(status => {
    if(status[0] == true){
      
      jwt.generate_jwt(status[1])
        .then(token => {
          
          res.cookie('authcookie',token,{maxAge:172800,httpOnly:false}) 
        })
    }
    else{
      res.send("User not found");
    }
  });
});

app.get('/dashboard/:jwtoken/', (req, res) => {
let params = req.params.jwtoken;

  jwt.verify_jwt(params)
    .then(id => {
      res.send(id);
    })
});


app.post('/query_data', (req, res) => {
  let params = {country: req.body.country, state: req.body.state, city: req.body.city, borough: req.body.borough, };

  console.log(params);

  microservices.get_data(params)
  .then(response => {
    if(response.status == 102){
      res.status(102).end()
    }
    else if(response.status == 200){
      res.status(200).send(response.data).end()
    }
    else{
      res.status(404).end();
    }
  })
  .catch(err => console.log(err));
});


app.post('/query_reports/:user_id', (req, res) => {
  let params = req.params.user_id;

  console.log(params);

  microservices.get_reports(params)
  .then(response => {
    res.send(response);
  })
  .catch(err => console.log(err));
});


app.get('/query_list/:list_of/:country/:state/:city/:borough', (req, res) => {
  let params = {
    list: req.params.list_of,
    country: req.params.country, 
    state: req.params.state, 
    city: req.params.city, 
    borough: req.params.borough 
  };

  console.log(params);

  dataBase.query_geo_list(params, db_client)
    .then(list => {
      console.log(list);
      res.send(list)
    })
  
});



app.get('/', (req, res) => {
  console.log(req.ip)
  
});
