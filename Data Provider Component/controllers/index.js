let {id_query_document} = require('../controllers/actions/id_query_document');
let {query_document} = require('../controllers/actions/query_document');

let {add_document} = require('../controllers/rabbitmq/add_document');

module.exports = {
  id_query_document,
  query_document,

  add_document
}

