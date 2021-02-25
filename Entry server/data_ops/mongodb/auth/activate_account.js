async function activate_account(code) {

  let query = {
    "acivate-account": code
  };
  let updates = {
    $set: {
      "isActive": true
    },
    $unset: {
      "acivate-account": 1
    }
  };
  let project = {
    projection: {
      "email": 1
    }
  }


  let activation = await db_client.db("VennerDB").collection("Users").findOneAndUpdate(query, updates, project, {
    returnOriginal: false
  });

  return activation.value;

}