const {rabbit_client} = require('../../rabbitmq/index');

async function report_generate_producer(message) {
  console.log("Publishing");
  var ch = await rabbit_client.createChannel()
  var exch = 'venner';
  var rkey = 'report-to_generate';
  var msg = message;
  await ch.publish(exch, rkey, Buffer.from(msg));
  setTimeout(function () {
    ch.close();
  }, 500);
}

exports.report_generate_producer = report_generate_producer;