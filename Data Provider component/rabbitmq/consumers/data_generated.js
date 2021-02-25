const {rabbit_client} = require('../../rabbitmq/index');
const {data_availability_notification} = require('../../rabbitmq/index');
const {add_document} = require('../controllers/index');

async function data_generated(rabbit_client) {
  let ch = await rabbit_client.createChannel();
  ch.prefetch(1);
  ch.consume("data-generated", function (msg) {

    add_document(msg)
      .then(postMsg => {
        data_availability_notification(postMsg)
          .then(() => ch.ack(msg))
          .catch(() => ch.nack(msg))
      })
      .catch(() => ch.nack(msg))

  }, {
    noAck: false
  });
  console.log("Worker is started");
};

exports.data_generated = data_generated;