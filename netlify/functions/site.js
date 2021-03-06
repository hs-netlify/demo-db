import { connectToDatabase } from "../../utils";
import fetch from "node-fetch";

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
    delete props["_id"];
    const site = await db
      .collection("sites")
      .findOneAndUpdate({ id: siteId }, { $set: { ...props } });
    const rebuild = await fetch(
      "https://api.netlify.com/build_hooks/626bb8a4d4e0bd6a3b189d9c",
      { method: "POST" }
    );
    return { statusCode: 200, body: JSON.stringify(site) };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Unable to update site" }),
    };
  }
};
exports.handler = async (event, context) => {
  // otherwise the connection will never complete, since
  // we keep the DB connection alive

  context.callbackWaitsForEmptyEventLoop = false;
  const { siteId } = event.queryStringParameters;

  //Return bad request if no site id
  if (!siteId)
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Site ID not found" }),
    };

  const db = await connectToDatabase();
  if (event.httpMethod === "GET") {
    return fetchSite(db, siteId);
  } else if (event.httpMethod === "PUT") {
    const props = JSON.parse(event.body);

    const { siteId } = event.queryStringParameters;
    if (!siteId)
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Site ID not found" }),
      };

    context.callbackWaitsForEmptyEventLoop = false;
    return updateSiteDetails(db, siteId, props);
  }
};
