const express = require('express');;
const {audit_reports} = require('./data_ops/index');
const {report_generated_consumer} = require('./rabbitmq/index');

const app = express();

app.use('/api', require('./routes/api_v1/api'));


app.listen(3000, () => {
  console.log('server started');
});

audit_reports();
report_generated_consumer();

