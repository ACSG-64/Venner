const axios = require('axios')

async function get_report_by_id(user_id){

  let query = `https://codedoor-fswd-data-provider-service.andrescamilocamilo.repl.co/api/delete_rep/${df_id}`;
  
  try{
    const response = await axios.put(query);
    if(response.status == 200){
      return true
    } else{
      throw "Intexistent DF"
    }  
  }
  catch(err){
    throw "The data provider microservice is offline or not working"
  }
    
}

exports.get_dataframe = get_dataframe;