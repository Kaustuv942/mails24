
let express = require('express')

let app = express();

var port = process.env.PORT || 8080;

app.get('/', (req, res) => res.send('Welcome to Express 1.0'));

app.listen(port, function() {
    console.log("Running FirstRest on Port "+ port);
})


const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://admin:password@msgscheduler.r00cg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
