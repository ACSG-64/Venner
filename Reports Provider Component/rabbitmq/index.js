const {report_generated_consumer} = require('../rabbitmq/consumers/report_generated_consumer');
const {report_to_generate} = require('../rabbitmq/producers/report_generate_producer');
const {reports_to_delete} = require('../rabbitmq/producers/reports_to_delete');
const {rabbitmq_init} = require('../rabbitmq/initializer/rabbitmq_init');


let rabbit_client = rabbitmq_init().then(client => rabbit_client = client);

module.exports = {
  report_generated_consumer,
  report_to_generate,

  rabbit_client
}