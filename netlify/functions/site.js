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
  // otherwise the connection will never complete, since
  // we keep the DB connection alive

  context.callbackWaitsForEmptyEventLoop = false;
  const { siteId } = event.queryStringParameters;

  //Return bad request if no site id
  if (!siteId) return { statusCode: 400, body: "Site ID not found" };

  const db = connectToDatabase();
  if (event.httpMethod === "GET") {
    return fetchSite(db, siteId);
  } else if (event.httpMethod === "PUT") {
    const props = JSON.parse(event.body);
    const { siteId } = event.queryStringParameters;
    if (!siteId) return { statusCode: 400, body: "Site ID not found" };
    const db = await connectToDatabase();

    context.callbackWaitsForEmptyEventLoop = false;
    return updateSiteDetails(db, siteId, props);
  }
};
