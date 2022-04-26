import fetch from "node-fetch";

import { connectToDatabase } from "../../utils";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const syncDB = async (db) => {
  try {
    const sites = await (await fetch(`${baseUrl}/api/fetch_sites`)).json();

    sites.forEach((site) => {
      db.collection("sites").findOneAndUpdate(
        { id: site.id },
        { $set: { ...site } },
        { new: true, upsert: true }
      );
    });
    return { statusCode: 200, body: JSON.stringify({ msg: "Success" }) };
  } catch (error) {
    console.log("Unable to sync sites ", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Unable to sync sites" }),
    };
  }
};

exports.handler = async (event, context) => {
  // otherwise the connection will never complete, since
  // we keep the DB connection alive
  context.callbackWaitsForEmptyEventLoop = false;

  const db = await connectToDatabase();
  return syncDB(db);
};
