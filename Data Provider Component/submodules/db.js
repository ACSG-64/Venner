
const mongo = require('mongodb');

// Connection URI
let uri = "mongodb+srv://data_service:CDfswd64@vennerdb.nlif3.mongodb.net/VennerDB?retryWrites=true&w=majority";

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

async function search_document(query, db_client){
  let results = await db_client.db("VennerDB").collection("DataFrames").findOne({country: query[0], state: query[1], city: query[2], borough: query[3]});
  return results;
}

async function search_document_by_id(query, db_client){
  try{
    let results = await db_client.db("VennerDB").collection("DataFrames").findOne({_id: mongo.ObjectId(query)} );
    console.log(results);
    if (results != null){
      return results
    } else {
      return null
    }
  } catch(err){
    console.log(err)
    return null;
  }
}

async function add_document(document, db_client){

  let json_document = JSON.parse(document);

  const currentDate = Date.now();    
  const todayDate = new Date(currentDate);
  const tenDaysDate = new Date(currentDate + 864000000);

  json_document["createdAt"] = new Date();
  json_document["creation-date"] = todayDate.toLocaleDateString();;
  json_document["expiration-date"] = tenDaysDate.toLocaleDateString();


  let results = await db_client.db("VennerDB").collection("DataFrames").insertOne(json_document);
  return true;
}

exports.mongo_init = mongo_init;
exports.search_document = search_document;
exports.search_document_by_id = search_document_by_id;
exports.add_document = add_document;
