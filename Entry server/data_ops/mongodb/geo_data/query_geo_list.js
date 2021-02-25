

async function query_geo_list(request) {

  let list_to_find = request.list;

  // If we dont have any data
  if ((request.country == "country") && (request.state == "state") && (request.city == "city") && (request.borough == "borough") && (list_to_find == "countries")) {

    let results_list = await db_client.db("VennerDB").collection("GeoData").distinct('country');

    return results_list;
  }

  // If we want to find STATES we need COUNTRIES
  if (list_to_find == "states") {

    if (request.country != "country") {
      let query = {
        "country": request.country
      };

      let results_list = await db_client.db("VennerDB").collection("GeoData").distinct('state', query);

      return results_list;
    }
  }

  // If we want to find CITIES we need COUNTRIES and STATE
  else if (list_to_find == "cities") {

    if ((request.country != "country") && (request.state != "state")) {

      let query = {
        "country": request.country,
        "state": request.state
      };

      let results_list = await db_client.db("VennerDB").collection("GeoData").distinct('city', query);

      return results_list;
    }
  }
  
  // If we want to find BOROUGHS we need COUNTRIES, STATE and CITY
  else if (list_to_find == "boroughs") {

    console.log("OK")
    if ((request.country != "country") && (request.state != "state") && (request.city != "city")) {

      let query = {
        "country": request.country,
        "state": request.state,
        "city": request.city
      };

      let results_list = await db_client.db("VennerDB").collection("GeoData").distinct('boroughs', query);

      return results_list;
    }

  } else {
    return "Invalid input"
  }

}