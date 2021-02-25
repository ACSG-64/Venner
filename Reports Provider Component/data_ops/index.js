// [Data base]
// [[maintenance_tasks]]
const {delete_document} = require('../data_ops/database/maintenance_tasks/delete_document');
const {expired_reports} = require('../data_ops/database/maintenance_tasks/expired_reports');

// [[rabbitmq]]
const {add_report_path} = require('../data_ops/database/rabbitmq/add_report_path');

// [[users]]
const {create_document} = require('../data_ops/database/users/create_document');
const {add_user} = require('../data_ops/database/users/add_user');
const {remove_user} = require('../data_ops/database/users/remove_user');
const {retreive_reports} = require('../data_ops/database/users/retreive_reports');
const {retreive_reports_by_id} = require('../data_ops/database/users/retreive_reports_by_id');

//[Microservices]
const {get_dataframe} = require('../data_ops/microservices/get_dataframe');

// [Scheduled Tasks]
const {audit_reports} = require('../data_ops/scheduled_tasks/audit_reports');

// [Initializers]
const {mongo_init} = require('../data_ops/initializers/mongo_init');

let db_client = mongo_init().then(client => db_client = client)

module.exports = {  
  create_document,
  delete_document,

  add_report_path,

  add_user,
  remove_user,

  retreive_reports, 
  retreive_reports_by_id,

  get_dataframe,  
  
  db_client,

  audit_reports
}