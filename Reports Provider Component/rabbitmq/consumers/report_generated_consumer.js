const {rabbit_client} = require('../../rabbitmq/index');
const {add_report_path} = require('../../data_ops/add_report_path');

async function report_generated_consumer() {
  let ch = await rabbit_client.createChannel();
  ch.prefetch(1);
  
  ch.consume("report-generated", function (msg) {

    let message = msg.content.toString().split(",");

    try {
      await add_report_path(message);
      ch.ack(msg);
    } catch (err) {
      ch.noAck(msg);
    }

  }, {
    noAck: false
  });
  console.log("RabbitMQ worker is started");
};

exports.report_generated_consumer = report_generated_consumer;