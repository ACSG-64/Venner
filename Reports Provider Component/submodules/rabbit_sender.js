const amqplib = require('amqplib');

var amqp_url = 'amqps://knuafcvn:B0NSPeYvE5mp2YzMucVrYb7Ppw6Tn_4D@fly.rmq.cloudamqp.com/knuafcvn';

async function produce(message, conn){
  console.log("Publishing");
  var ch = await conn.createChannel()
  var exch = 'venner';
  var rkey = 'report-to_generate';
  var msg = message;
  await ch.publish(exch, rkey, Buffer.from(msg));
  setTimeout( function()  {
      ch.close();
      },  500 );
}

exports.produce = produce;