const {db_client} = require('../../../data_ops/index');

async function retreive_reports(user_id){

  let query = {
    "users-allowed": user_id
  }
  let q_projection = {
    projection: {
      "users-allowed": 0
    }
  }  

  // Find all documents associated with the user
  let results = await db_client.db("VennerDB").collection("PDF_Reports").find(query, q_projection).toArray();

  return results;
  
}

exports.retreive_reports = retreive_reports;