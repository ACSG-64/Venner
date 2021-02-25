const axios = require('axios')

async function get_report_by_id(user_id, rep_id){

  let query = `https://codedoor-fswd-reports-provider-service.andrescamilocamilo.repl.co/api/retreive_rep/${user_id}/${df_id}`;
  
  try{
    const response = await axios.get(query);
    if(response.status == 200){
      return response.body
    } else{
      throw "Intexistent report"
    }  
  }
  catch(err){
    throw "The reports provider microservice is offline or not working"
  }
    
}

exports.get_dataframe = get_dataframe;