import { connectToDatabase } from "../../utils'

const updateSiteDetails = async (db, siteId, props) => {
  try {
    const site = await db
      .collection("sites")
      .findOneAndUpdate({ id: siteId }, { $set: { ...props } });
    return { statusCode: 200, body: site };
  } catch (error) {
    return { statusCode: 500, body: "Unable to update site" };
  }
};
exports.handler = async (event, context) => {
  const { siteId } = event.queryStringParameters;
  if (!siteId) return { statusCode: 400, body: "Site ID not found" };
  const db = await connectToDatabase();

  const props = event.body;

  context.callbackWaitsForEmptyEventLoop = false;
  return updateSiteDetails(db, siteId, props);
};
