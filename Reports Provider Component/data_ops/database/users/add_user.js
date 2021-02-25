const {db_client} = require('../../../data_ops/index');

async function add_user(user_id, df_id, db_client) {

  let query = {
    "data-frame-id": df_id
  };
  let newUser = {
    $addToSet: {
      "users-allowed": user_id
    }
  };
  let q_projection = {
    projection: {
      "users-allowed": 0
    }
  }

  let report = await db_client.db("VennerDB").collection("PDF_Reports").findOneAndUpdate(query, newUser, q_projection, {
    returnOriginal: false
  });

  if (report.value == null) {
    throw "Inexistent document";
  }

  return report.value
}

exports.add_user = add_user;