const mongoURI = process.env.MONGO_URI;
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const dbName = "netlifydemodb";
let cachedDb = null;

exports.connectToDatabase = async () => {
  const client = await MongoClient.connect(mongoURI, {
    useUnifiedTopology: true,
  });

  let cachedDb = client.db(dbName);

  return client.db(dbName);
};
