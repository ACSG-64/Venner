const {db_client} = require('../../data_ops/index');

const mongo = require('mongodb');

async function search_document_by_id(df_id){

  let query = {
    _id: mongo.ObjectId(df_id)
  }

  let results = await db_client.db("VennerDB").collection("DataFrames").findOne(query);  

  return results;

}

exports.search_document_by_id = search_document_by_id;