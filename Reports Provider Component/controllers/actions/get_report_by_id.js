let {retreive_reports_by_id} = require('../../data_ops/index.js')

async function get_report_by_id(user_id, df_id) {

  try{
    let report = await retreive_reports_by_id(user_id, df_id);
    if (report === null){
      throw "Report not found";
    } else{      
      return report;
    }
  } catch(err){
    throw "Report not found";
  }
  
}

exports.get_reports = get_report_by_id;