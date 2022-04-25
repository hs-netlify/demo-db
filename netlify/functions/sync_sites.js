const MongoClient = require("mongodb").MongoClient;
import fetch from "node-fetch";

const mongoURI = process.env.MONGO_URI;
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const dbName = "netlifydemodb";
let cachedDb = null;

const connectToDatabase = async (uri) => {
  if (cachedDb) return cachedDb;

  const client = await MongoClient.connect(uri, {
    useUnifiedTopology: true,
  });

  cachedDb = client.db(dbName);

  return cachedDb;
};

const syncDB = async (db) => {
  try {
    const sites = await (await fetch(`${baseUrl}/api/sites`)).json();

    sites.forEach((site) => {
      db.collection("sites").findOneAndUpdate(
        { id: site.id },
        { $set: { ...site } },
        { new: true, upsert: true }
      );
    });
    return { statusCode: 200, body: "Success" };
  } catch (error) {
    console.log("Unable to sync sites ", error);
    return { statusCode: 500, body: "Unable to sync sites" };
  }
};

exports.handler = async (event, context) => {
  // otherwise the connection will never complete, since
  // we keep the DB connection alive
  context.callbackWaitsForEmptyEventLoop = false;

  const db = await connectToDatabase(mongoURI);
  return syncDB(db);
};
