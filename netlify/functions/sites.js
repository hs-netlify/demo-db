import { connectToDatabase } from "../../utils";

const getSites = async (db, page, perPage) => {
  try {
    const sites = await db
      .collection("sites")
      .find()
      .sort({ "published_deploy.published_at": -1 })
      .toArray();

    return { statusCode: 200, body: JSON.stringify(sites) };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Unable to fetch sites" }),
    };
  }
};
exports.handler = async (event, context) => {
  const { page, perPage } = event.queryStringParameters;

  context.callbackWaitsForEmptyEventLoop = false;
  const db = await connectToDatabase();
  return getSites(db, page, perPage);
};
