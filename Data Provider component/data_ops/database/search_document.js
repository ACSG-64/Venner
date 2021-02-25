const {db_client} = require('../../data_ops/index');

async function search_document(params){

  let query = {
    country: params.country,
    state: params.state,
    city: params.city,
    borough: params.borough
  }

  let results = await db_client.db("VennerDB").collection("DataFrames").findOne(query);
  
  return results;

}

exports.search_document = search_document;