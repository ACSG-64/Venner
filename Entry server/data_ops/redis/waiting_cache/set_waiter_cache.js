async function set_waiter_cache(params){

  let key = `${params.country},${params.state},${params.city},${params.borough}`;
  let data = "The data is currently generating";

  await redis_client.setex(key, 1800, data);
    
}