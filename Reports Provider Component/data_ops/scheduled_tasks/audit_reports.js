const cron = require('node-cron');
const {retreive_expired_reports} = require('../../../data_ops/index');
const {delete_document} = require('../../../data_ops/index');
const {reports_to_delete} = require('../../../rabbitmq/index');
 
async function audit_reports(){

  cron.schedule('0 0 0/12 ? * * *', () => {
    let expired_reports = await retreive_expired_reports;
    try{
      await reports_to_delete(expired_reports.toString());
      await delete_document(expired_reports);
    } catch(err){
      
    }
  });

}

exports.audit_reports = audit_reports;

