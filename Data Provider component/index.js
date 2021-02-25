const express = require('express');
const {data_generated} = require('./rabbitmq/index');

const app = express();

app.use('/api', require('./routes/api_v1/api'));


app.listen(3000, () => {
  console.log('server started');
});

data_generated();

