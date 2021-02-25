const {rabbit_client} = require('../../rabbitmq/index');

async function reports_to_delete(message) {
  console.log("Publishing");
  var ch = await rabbit_client.createChannel()
  var exch = 'venner';
  var rkey = 'report-to_delete';
  var msg = message;
  await ch.publish(exch, rkey, Buffer.from(msg));
  setTimeout(function () {
    ch.close();
  }, 500);
}

exports.reports_to_delete = reports_to_delete;