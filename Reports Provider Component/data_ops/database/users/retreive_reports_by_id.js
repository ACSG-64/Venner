const {db_client} = require('../../../data_ops/index');

async function retreive_reports_by_id(user_id, df_id){

  let query = {
    "users-allowed": user_id,
    "data-frame-id": df_id
  }
  let q_projection = {
    projection: {
      "users-allowed": 0
    }
  }  

  // Find all documents associated with the user
  let results = await db_client.db("VennerDB").collection("PDF_Reports").findOne(query, q_projection);

  return results;
  
}

exports.retreive_reports_by_id = retreive_reports_by_id;