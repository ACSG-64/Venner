const axios = require('axios')

// DATA PROVIDER
async function get_data(params){

  let query = `https://codedoor-fswd-data-provider-service.andrescamilocamilo.repl.co/query/${params.country}`;

  const response = await axios.get(query);

  if(response.status == 200){
    return true
  }
  else{
    return false
  }
  
  
}
