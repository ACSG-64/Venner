let {create_report} = require('../controllers/actions/create_report');
let {get_reports} = require('../controllers/actions/get_reports.js');
let {get_report_by_id} = require('../controllers/actions/get_report_by_id.js');
let {remove_report} = require('../controllers/actions/remove_report.js');


module.exports = {
  create_report,
  get_reports,
  get_report_by_id,
  remove_report  
}

