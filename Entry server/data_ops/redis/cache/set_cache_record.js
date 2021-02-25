async function set_cache_record(params, data){

  let key = `${params.country},${params.state},${params.city},${params.borough}`;
  let data = JSON.stringify(data);

  // Store the data only by 30 minutes
  await redis_client.setex(key, 1800, data);

}