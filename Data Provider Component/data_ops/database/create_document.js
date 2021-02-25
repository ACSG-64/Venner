const {db_client} = require('../../data_ops/index');

async function create_document(document){
  
  await db_client.db("VennerDB").collection("DataFrames").insertOne(json_document);

}

exports.create_document = create_document;