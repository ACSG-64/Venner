const {create_document} = require('../data_ops/database/create_document');
const {delete_document} = require('../data_ops/database/delete_document');

const {create_document} = require('../data_ops/database/create_document');
const {search_document_by_id} = require('../data_ops/database/search_document_by_id');
const {search_document} = require('../data_ops/database/search_document');

const {mongo_init} = require('../data_ops/initializers/mongo_init');

let db_client = mongo_init().then(client => db_client = client)

module.exports = {  
  create_document,
  search_document_by_id,
  search_document, 
  
  db_client,
}