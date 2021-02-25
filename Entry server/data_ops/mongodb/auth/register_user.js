async function register_user(user_name, email, password) {

  // Check if an account exists with the same username or email
  let query = {
    $or: [{
      "user-name": user_name
    }, {
      "email": email
    }]
  }

  let results = await db_client.db("VennerDB").collection("Users").countDocuments(query);

  if (results > 0){
    throw "User name or email is in use"
  }

  // If not, create a document for the user
  let random_string = new Date() + Math.random();

  let user = {
    "user-name": user_name.toString(),
    "email": email.toString(),
    "password": password.toString(),
    "queries": 15,
    "creation-date": new Date(),
    "acivate-account": crypto.createHash('md5').update(random_string).digest('hex'),
    "isActive": false
  }
  
  await db_client.db("VennerDB").collection("Users").insertOne(user);

  return {
    "user_name": user["user-name"],
    "email": user["email"],
    "activation_code": user["actiate-account"]
  }

  

}