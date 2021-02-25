// [Microservices]
// Data provider
const {get_dataframe} = require('../data_ops/microservices/data_provider/get_dataframe');
// Reports provider
const {get_report_by_id} = require('../data_ops/microservices/reports_provider/get_report_by_id');
const {get_reports} = require('../data_ops/microservices/reports_provider/get_reports');
const {remove_report} = require('../data_ops/microservices/reports_provider/remove_report');

// [MongoDB]
// Auth
const {activate_account} = require('../data_ops/mongodb/auth/activate_account');
const {login_user} = require('../data_ops/mongodb/auth/login_user');
const {register_user} = require('../data_ops/mongodb/auth/register_user');
// Geo Data
const {create_document} = require('../data_ops/database/create_document');

// [Redis]
// Cache
const {get_cache_record} = require('../data_ops/redis/cache/get_cache_record');
const {set_cache_record} = require('../data_ops/redis/cache/set_cache_record');
// Waiting cache
const {destroy_waiter_cache} = require('../data_ops/redis/waiting_cache/destroy_waiter_cache');
const {set_waiter_cache} = require('../data_ops/redis/waiting_cache/set_waiter_cache');

const {mongo_init} = require('../data_ops/initializers/mongo_init');

let db_client = mongo_init().then(client => db_client = client)

module.exports = {  
  get_dataframe,
  get_report_by_id,
  get_reports,
  remove_report,

  activate_account,
  login_user,
  register_user,

  get_cache_record,
  set_cache_record,
  destroy_waiter_cache,
  set_waiter_cache,
  
  db_client,
}