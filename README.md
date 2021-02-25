# Entry Server - Venner
It is responsible for authorization and authentication procedures. It handles all frontend requests and collects the required data from the microservices to the client.

## Tasks
* User registration and login.
* Handle user requests and request data from microservices.

## Communication
* Stores the data from the microservice data provider in a cache to reduce the number of HTTP queries.
* It does not publish any messages to RabbitMQ, it is only notified when the microservice data provider generated data that was requested.
* Communication with the client is by HTTP requests.

## Technologies
* Node.js.
  * Express. 
* Json Web Tokens.
* Mongo DB (Atlas).
* Redis.
* RabbitMQ.
