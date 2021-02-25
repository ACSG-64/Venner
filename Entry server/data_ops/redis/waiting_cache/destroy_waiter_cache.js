async function destroy_waiter_cache(params){

  let key = `${params.country},${params.state},${params.city},${params.borough}`;

  await redis_client.del(key);
  
}