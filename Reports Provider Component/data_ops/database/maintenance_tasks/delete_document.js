const {db_client} = require('../../../data_ops/index');

async function delete_document(ids_array) {

  let query = {
    "data-frame-id": {
      $in: ids_array
    }
  }

  await db_client.db("VennerDB").collection("PDF_Reports").deleteMany(query);

}

exports.delete_document = delete_document;