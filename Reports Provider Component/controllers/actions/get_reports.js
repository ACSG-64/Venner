let {retreive_reports} = require('../../data_ops/index.js')

async function get_reports(user_id) {

  try{
    let list = await retreive_reports(user_id);
    return ((list.length > 0) ? list : false)
  } catch(err){
    throw "Error while trying to list the reports";
  }
  
}

exports.get_reports = get_reports;