let {search_document} = require('../../data_ops/index.js');
let {data_to_generate} = require('../../rabbitmq/index.js')

async function query_document(params) {

  try {
    let data = await search_document(params);
    if (data === null) {
      try {
        await data_to_generate(params);
        return false;
      } catch (err) {
        throw ("Unable to perform the generation of the data")
      }
    } else {
      return data;
    }
  } catch (err) {
    throw ("Unable to query the the data")
  }

}
exports.query_document = query_document;