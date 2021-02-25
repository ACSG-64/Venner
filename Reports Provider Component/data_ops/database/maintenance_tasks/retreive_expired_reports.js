const {db_client} = require('../../../data_ops/index');
async function retreive_expired_reports(range){

  // Retreive the reports with its expiration date is less than the current date 
  let query = {
    "expireAt": {
      $lt: new Date()
    }
  }

  let q_projection = {
    projection: {
      "data-frame-id": 1
    }
  }  

  let results = await db_client.db("VennerDB").collection("PDF_Reports").find(query, q_projection).toArray();

  if(results.length > 0){
    return results;
  } else{
    return false
  }  
    
}