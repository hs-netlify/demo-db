import { connectToDatabase } from "../../utils";
const MongoClient = require("mongodb").MongoClient;

const updateSiteDetails = async (db, siteId, props) => {
  try {
    console.log({ ...props });
    const site = await db
      .collection("sites")
      .findOneAndUpdate({ id: siteId }, { $set: { ...props } });
    return { statusCode: 200, body: JSON.stringify(site) };
  } catch (error) {
    return { statusCode: 500, body: "Unable to update site" };
  }
};
exports.handler = async (event, context) => {
  const props = JSON.parse(event.body);
  const { siteId } = event.queryStringParameters;
  if (!siteId) return { statusCode: 400, body: "Site ID not found" };
  const db = await connectToDatabase();

  context.callbackWaitsForEmptyEventLoop = false;
  return updateSiteDetails(db, siteId, props);
};
