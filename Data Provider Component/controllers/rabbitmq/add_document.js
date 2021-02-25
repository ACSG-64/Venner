const {create_document} = require('../../data_ops/create_document');

function add_document(msg){
  let json_document = JSON.parse(msg.content.toString());

  const currentDate = Date.now();    
  const todayDate = new Date(currentDate);
  const tenDaysDate = new Date(currentDate + 864000000);

  json_document["createdAt"] = new Date();
  json_document["creation-date"] = todayDate.toLocaleDateString();
  json_document["expiration-date"] = tenDaysDate.toLocaleDateString();

  await create_document(json_document);
  return `${json_document.country},${json_document.state},${json_document.city},${json_document.borough}`;


}
exports.add_document = add_document;