const axios = require('axios')

async function get_report_by_id(params){

  let query = `https://codedoor-fswd-data-provider-service.andrescamilocamilo.repl.co/api/query/${params.country}/${params.state}/${params.city}/${params.borough}`;
  
  const response = await axios.get(query);
  return response;
    
    
}

exports.get_dataframe = get_dataframe;