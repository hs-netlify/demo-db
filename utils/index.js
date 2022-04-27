const mongoURI = process.env.MONGO_URI;
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const dbName = "netlifydemodb";

const MongoClient = require("mongodb").MongoClient;

exports.connectToDatabase = async () => {
  const client = await MongoClient.connect(mongoURI, {
    useUnifiedTopology: true,
  });

  return client.db(dbName);
};
