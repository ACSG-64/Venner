const mongo = require('mongodb');

// Connection URI
let uri = "mongodb+srv://reports_provider_service:CDfswd64@vennerdb.nlif3.mongodb.net/VennerDB?retryWrites=true&w=majority";

// Create a new initialize a MongoClient
async function mongo_init() {
  const client = new mongo.MongoClient(uri, { useUnifiedTopology: true });

  try {
    // Connect the client to the server
    await client.connect();
    console.log("Connected successfully to Mongo");
    return client;
  } catch {
    console.log("Something goes wrong")
  }
}

exports.mongo_init = mongo_init;

