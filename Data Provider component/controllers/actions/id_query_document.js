let {search_document_by_id} = require('../../data_ops/index.js');

async function id_query_document(df_id) {

  try {
    let data = await search_document_by_id(df_id);
    if (data === null) {
      throw ("Unable to query the the data")
    } else {
      return data;
    }
  } catch (err) {
    throw ("Unable to query the the data")
  }

}
exports.id_query_document = id_query_document;