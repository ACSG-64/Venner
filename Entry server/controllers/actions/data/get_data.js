let {get_dataframe} = require('../../data_ops/index.js');
let {get_cache_record} = require('../../data_ops/index.js');
let {set_cache_record} = require('../../data_ops/index.js');
let {set_waiter_cache} = require('../../data_ops/index.js');


async function get_data(params) {

  try {
    // Get data from cache
    let data_cache = await get_cache_record(params);
    return data_cache;
  } catch (err) {
    try {
      // Get data from microservice
      let data_microservice = await get_dataframe(params);

      if (data_microservice.status == 200) {
        // If we get the data, save it in the cache
        set_cache_record(params, data_microservice.body);
        return data_microservice.body;
      } else if (data_microservice.status == 202) {
        // If the microservice desnt return the data, set waiter in cache and return false
        set_waiter_cache(params);
        return false;
      } else {
        throw "Invalid parameters";
      }
    } catch (err) {
      if (err.status.toString().charAt(0) == "5") {
        throw "Microservice unavailable";
      }
      throw "Invalid parameters";
    }
  }

}