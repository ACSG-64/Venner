const {data_generated} = require('../rabbitmq/consumers/data_generated');

const {data_availability_notification} = require('../rabbitmq/producers/data_availability_notification');
const {data_to_generate} = require('../rabbitmq/producers/data_to_generate');

const {rabbitmq_init} = require('../rabbitmq/initializer/rabbitmq_init');

let rabbit_client = rabbitmq_init().then(client => rabbit_client = client);

module.exports = {
  data_generated,

  data_availability_notification,
  data_to_generate,

  rabbit_client
}