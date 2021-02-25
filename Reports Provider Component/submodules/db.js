const mongo = require('mongodb');
const axios = require('axios');


// Connection URI
let uri = "mongodb+srv://reports_provider_service:CDfswd64@vennerdb.nlif3.mongodb.net/VennerDB?retryWrites=true&w=majority";



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

async function search_reports(user_id, db_client){

  let query = {"users-allowed": user_id}
  let q_projection = {projection: { "users-allowed": 0 } }

  // Find all documents associated with the user
  let results = await db_client.db("VennerDB").collection("PDF_Reports").find(query, q_projection).toArray();

  console.log(results)

  return results;  
}

/*async function search_specific_filled_reports(df_id, user_id, db_client){

  let query = {"data-frame-id": df_id, "users-allowed": user_id, "report-path":/.pdf/}
  let q_projection = {projection: { "users-allowed": 0 } }
  
  // Find all documents associated with the user
  let results = await db_client.db("VennerDB").collection("PDF_Reports").findOne(query, q_projection);

  return results;  
}*/

/*/
async function report_existence(df_id, db_client){

  let results = await db_client.db("VennerDB").collection("PDF_Reports").find({"data-frame-id": df_id}).toArray();

  console.log(results);

  if (results.length != 0){
    return true;
  } else {
    return false;
  }  
}*/


async function update_document_user(df_id, user_id, db_client){

  try{
    await db_client.db("VennerDB").collection("PDF_Reports").updateOne({ "data-frame-id": df_id }, {$addToSet : {"users-allowed": user_id}});
    return true;
  } catch (err){
    console.log(err);
    return false;
  }
  
}


async function request_data_frame(df_id, db_client){

  /*let results = await db_client.db("VennerDB").collection("DataFrames").find({_id: df_id}).limit(1);

  if (results != 0){
    return true;
  } else {
    return false
  } */

  let query = `https://codedoor-fswd-data-provider-service.andrescamilocamilo.repl.co/query/${df_id}`;

  try{
    const response = await axios.get(query);
    if(response.status == 200){
    return true
    }
    else{
      return false
    }
  } catch(err){
    return false    
  }
  
}


async function add_document(df_id, user_id, db_client){

  let data_frame = await db_client.db("VennerDB").collection("DataFrames").findOne({_id: new mongo.ObjectID(df_id)}, {projection: { "maps": 0, "clusters": 0 } } );

  console.log(data_frame);

  let rep_document = {
    "createdAt" : new Date(),
    "creation-date" :data_frame["creation-date"],
    "expiration-date" : "",
    "data-frame-id": df_id,
    "country": data_frame["country"],
    "state": data_frame["state"],
    "city": data_frame["city"],
    "borough": data_frame["borough"],
    "report-path": "",
    "users-allowed": [user_id]
  }

  console.log(rep_document);


  try{
    await db_client.db("VennerDB").collection("PDF_Reports").insertOne(rep_document);
    return true;
  } catch(err){
    console.log(err);
    return false;
  }  
}


async function update_document_rep(params, db_client){

  let df_id = params[1];
  let pdf_path = params[0]; 

  try{
    await db_client.db("VennerDB").collection("PDF_Reports").updateOne({ "data-frame-id": df_id }, {$set : {"report-path" : pdf_path} });
    return true;
  } catch (err){
    console.log(err);
    return false;
  }  
}


async function remove_document_user(params, db_client){  

  try{
    await db_client.db("VennerDB").collection("PDF_Reports").updateOne({ "data-frame-id": params.data_frame_id }, {$pull : {"users-allowed": params.user_id}});
    return true;
  } catch (err){
    console.log(err);
    return false;
  }
  
}



exports.mongo_init = mongo_init;
exports.search_filled_reports = search_filled_reports;
exports.search_specific_filled_reports = search_specific_filled_reports;
exports.report_existence = report_existence;
exports.update_document_user = update_document_user;
exports.data_frame_existence = data_frame_existence;
exports.add_document = add_document;
exports.update_document_rep = update_document_rep;
exports.remove_document_user = remove_document_user;
