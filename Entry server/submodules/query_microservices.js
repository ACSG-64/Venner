const axios = require('axios')

// DATA PROVIDER
async function get_data(params){

  let query = `https://codedoor-fswd-data-provider-service.andrescamilocamilo.repl.co/query/${params.country}/${params.state}/${params.city}/${params.borough}`;

  const response = await axios.get(query);
  
  return response
}

// REPORTS PROVIDER
async function get_reports(user_id){

  let query = `https://codedoor-fswd-reports-service.andrescamilocamilo.repl.co/retreive/${user_id}`;

  const response = await axios.get(query);
  
  return response.data;
}

async function get_report_by_id(params){

  let query = `https://codedoor-fswd-reports-service.andrescamilocamilo.repl.co/query/${params.country}/${params.state}/${params.city}/${params.borough}`;

  const response = await axios.get(query);
  
  return response.data;
}

async function add_report(params){

  let query = `https://codedoor-fswd-data-provider-service.andrescamilocamilo.repl.co/query/${params.country}/${params.state}/${params.city}/${params.borough}`;

  const response = await axios.get(query);
  
  return response.data;
}



exports.get_data = get_data;
exports.get_reports = get_reports;
exports.get_report_by_id = get_report_by_id;
exports.add_report = add_report;