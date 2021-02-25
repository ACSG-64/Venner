const mongo = require('mongodb');
const crypto = require('crypto');
const email_sender = require(__dirname + '/email_sender.js');

// Connection URI
let uri = "mongodb+srv://nodejs_server:CDfswd64@vennerdb.nlif3.mongodb.net/VennerDB?retryWrites=true&w=majority";



// Create a new initialize a MongoClient
async function mongo_init() {
  const client = new mongo.MongoClient(uri, { useUnifiedTopology: true });
  try {
    // Connect the client to the server
    await client.connect();
    console.log("Connected successfully to Mongo");
    return client;
  } catch {
    console.log("Algo salió mal")
  }
}

async function check_duplicates_account(request, db_client){

  let query = {$or: [{"user-name": request[0]}, {"email": request[1]}]}

  let results = await db_client.db("VennerDB").collection("Users").findOne(query, { projection: { _id: 1, "email": 1 } });

  if (results == null){
    return false;
  } else {
    return true;
  } 
}


async function register_user(request, db_client) {
  let random_string = new Date() + Math.random()
  let user = {
    "user-name": request[0].toString(),
    "email": request[1].toString(),
    "password": request[2].toString(),
    "queries": 15,
    "creation-date": new Date(),
    "acivate-account": crypto.createHash('md5').update(random_string).digest('hex'),
    "isActive": false
  }

  try{
    // Add user into the DB
    await db_client.db("VennerDB").collection("Users").insertOne(user);
    // Send confirmation e-mail
    await email_sender.send_activation_email(user["email"], user["user-name"], user["acivate-account"]);

    return true;
  } catch(err){
    console.log(err);
    return false;
  }  
}


async function activate_account(request, db_client) {
  let query = { "acivate-account": request };
  let updates = {$set : {"isActive" : true}, 
  $unset: {"acivate-account": 1} };

  try{
    let user_document = await db_client.db("VennerDB").collection("Users").findOneAndUpdate(query, updates, {returnOriginal: false});

    return [true, user_document["value"]["email"] ];
  }
  catch(err){
    console.log(err);
    return [false];
  }
}

async function login_account(request, db_client){
  
  let query = {"email": request[0], "password": request[1], "isActive": true}

  try{
    let user_id = await db_client.db("VennerDB").collection("Users").findOne(query, { projection: { _id: 1 } });

    user_id["_id"] = user_id["_id"].valueOf();

    console.log(user_id);
    return [true, user_id["_id"]];
  }    
  catch (err){
    console.log(err);
    return [false];
  }
}

async function query_geo_list(request, db_client){

  let list_to_find = request.list;

  // If we dont have any data
  if((request.country == "country") && (request.state == "state") && (request.city == "city") && (request.borough == "borough") && (list_to_find == "countries")){

    let results_list = await db_client.db("VennerDB").collection("GeoData").distinct('country');

    return results_list;
  }  

  

  // If we want to find STATES we need COUNTRIES
  if(list_to_find == "states"){

    if(request.country != "country"){
      let query = {"country": request.country};

      let results_list = await db_client.db("VennerDB").collection("GeoData").distinct('state', query);

      return results_list;
    }

  }
  // If we want to find CITIES we need COUNTRIES and STATE
  else if(list_to_find == "cities"){

    if((request.country != "country") && (request.state != "state")){

      let query = {"country": request.country, "state": request.state};

      let results_list = await db_client.db("VennerDB").collection("GeoData").distinct('city', query);    

      return results_list;     
    }

  }
  // If we want to find BOROUGHS we need COUNTRIES, STATE and CITY
  else if(list_to_find == "boroughs"){

    console.log("OK")
    if((request.country != "country") && (request.state != "state") && (request.city != "city")){

      let query = {"country": request.country, "state": request.state, "city": request.city};

      let results_list = await db_client.db("VennerDB").collection("GeoData").distinct('boroughs', query);   

      return results_list;      
    }

  }
  else{
    return "Invalid input"
  }    
  
}

exports.mongo_init = mongo_init;
exports.check_duplicates_account = check_duplicates_account;
exports.register_user = register_user;
exports.activate_account = activate_account;
exports.login_account = login_account;
exports.query_geo_list = query_geo_list;