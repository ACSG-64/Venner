const cron = require('node-cron');
const {reset_queries_counter} = require('../../data_ops/index');
 
async function reset_query_counter(){

  // Reset the query counter for every user to 15 every 1st of each month
  cron.schedule('0 0 0 1 * ? *', () => {
    reset_queries_counter();
  });

  return results;
}

exports.audit_reports = audit_reports;
