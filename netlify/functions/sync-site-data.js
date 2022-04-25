const MongoClient = require("mongodb").MongoClient;

const mongoURI = process.env.MONGODB_URI;
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const db = "netlifydemodb";

const connectToDatabase = async (uri) => {
  //if (cachedDb) return cachedDb;

  const client = await MongoClient.connect(uri, {
    useUnifiedTopology: true,
  });

  cachedDb = client.db(DB_NAME);

  //return cachedDb;
};

const syncDB = async (db) => {
  const site = await fetch();
};

exports.handler = async (event, context) => {
  //   // otherwise the connection will never complete, since
  //   // we keep the DB connection alive
  //   context.callbackWaitsForEmptyEventLoop = false;

  //   const db = await connectToDatabase(mongoURI);
  //   return syncDB(db);
  return;
};
