const {rabbit_client} = require('../../rabbitmq/index');

async function data_availability_notification(message){
  console.log("Publishing");
  var ch = await rabbit_client.createChannel()
  var exch = 'venner';
  var rkey = 'data-to_generate';
  var msg = message;
  await ch.publish(exch, rkey, Buffer.from(msg));
  setTimeout( function()  {
      ch.close();
      },  500 );
}

exports.data_availability_notification = data_availability_notification;