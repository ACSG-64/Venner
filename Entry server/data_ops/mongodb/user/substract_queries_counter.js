const {db_client} = require('../../data_ops/index');

const mongo = require('mongodb');

async function substract_queries_counter(user_id, queries_counter){

  let query = {
    _id: mongo.ObjectId(user_id)
  }

  let newCounter = {
    $set: {
      "queries": queries_counter - 1
    }
  }

  await db_client.db("VennerDB").collection("Users").updateOne(query, newCounter);  

}

exports.substract_queries_counter = substract_queries_counter;