const {db_client} = require('../../../data_ops/index');

async function remove_user(user_id, df_id){

  await db_client.db("VennerDB").collection("PDF_Reports").updateOne({
    "data-frame-id": df_id
  }, {
    $pull: {
      "users-allowed": user_id
    }
  });
  
}

exports.remove_user = remove_user;