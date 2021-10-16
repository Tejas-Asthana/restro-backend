const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://tejas:testpassword@restraunt.uvxsy.mongodb.net/restraunt?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

(async () => {
  await client.connect();
})();

module.exports = client;
