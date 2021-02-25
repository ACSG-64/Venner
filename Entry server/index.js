const express = require('express');
//const {data_microservice_listener} = require('./rabbitmq/index');

const app = express();

app.use('/auth', require('./routes/api_v1/auth'));
app.use('/api/data', require('./routes/api_v1/data'));
app.use('/api/reports', require('./routes/api_v1/reports'));


app.listen(3000, () => {
  console.log('server started');
});

//data_microservice_listener();