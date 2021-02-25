const {rabbit_client} = require('../../rabbitmq/index');

async function data_to_generate(message) {
  console.log("Publishing");
  var ch = await rabbit_client.createChannel()
  var exch = 'venner';
  var rkey = 'data-to_generate';
  var msg = `${message.country},${message.state},${message.city},${message.borough},`;
  await ch.publish(exch, rkey, Buffer.from(msg));
  setTimeout(function () {
    ch.close();
  }, 500);
}

exports.data_to_generate = data_to_generate;