let {remove_user} = require('../../data_ops/index.js')

async function remove_reports(user_id, df_id) {

  try{
    let removed = await remove_user(user_id, df_id);
    return true;
  } catch(err){
    throw "Error while trying to remove the report";
  }

}

exports.remove_reports = remove_reports;