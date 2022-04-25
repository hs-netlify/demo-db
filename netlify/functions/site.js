import { connectToDatabase } from "../../utils";

const fetchSite = async (db, siteId) => {
  try {
    const site = await db.collection("sites").findOne({ id: siteId });
    return { statusCode: 200, body: JSON.stringify(site) };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Unable to fetch site" }),
    };
  }
};
exports.handler = async (event, context) => {
  // otherwise the connection will never complete, since
  // we keep the DB connection alive

  context.callbackWaitsForEmptyEventLoop = false;
  const { siteId } = event.queryStringParameters;

  const db = await connectToDatabase();
  return fetchSite(db, siteId);
};
