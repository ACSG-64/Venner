const {db_client} = require('../../data_ops/index');
const mongo = require('mongodb');

async function reset_queries_counter(){

  let newCounter = {
    $set: {
      "queries": 15
    }
  }

  await db_client.db("VennerDB").collection("Users").updateOne({}, newCounter);  

}

exports.reset_queries_counter = reset_queries_counter;