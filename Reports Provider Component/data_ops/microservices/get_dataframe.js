const axios = require('axios')

//#################
//# Data provider #
//#################

async function get_dataframe(df_id){

  let query = `https://codedoor-fswd-data-provider-service.andrescamilocamilo.repl.co/api/query_id/${df_id}`;
  
  try{
    const response = await axios.get(query);
    if(response.status == 200){
      return response.body
    } else{
      throw "Intexistent DF"
    }  
  }
  catch(err){
    throw "The data provider microservice is offline or not working"
  }


  
}

exports.get_dataframe = get_dataframe;