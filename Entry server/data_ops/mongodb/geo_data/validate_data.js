async function validate_data(params) {

  // Check if an account exists with the same username or email
  let query = {
    "country": params.country,
    "state": params.state,
    "city": params.city,
    "borough": params.borough
  }

  let results = await db_client.db("VennerDB").collection("GeoData").countDocuments(query);

  if (results == 0){
    throw "Invalid parameters"
  }

  return true;

}