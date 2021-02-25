const {db_client} = require('../../data_ops/index');

const mongo = require('mongodb');

async function get_queries_counter(user_id){

  let query = {
    _id: mongo.ObjectId(user_id)
  }

  let q_projection = {
    projection: {
      "queries": 1
    }
  }  
  let results = await db_client.db("VennerDB").collection("Users").findOne(query, q_projection);  

  return queries;

}

exports.get_queries_counter = get_queries_counter;