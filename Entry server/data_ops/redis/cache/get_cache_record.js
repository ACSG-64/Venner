async function get_cache_record(params){

  let key = `${params.country},${params.state},${params.city},${params.borough}`;

  let data = await redis_client.get(key);
  if(data != ""){
    return JSON.parse(data)
  } else{
    throw "Data not found";
  }

}