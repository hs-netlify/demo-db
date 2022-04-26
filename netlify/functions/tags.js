import { connectToDatabase } from "../../utils";

const fetchTagList = async (db) => {
  try {
    const tags = await db.collection("sites").distinct("tags");
    return { statusCode: 200, body: JSON.stringify(tags) };
  } catch (error) {
    console.log(error);
    return {
      statuCode: 500,
      body: JSON.stringify({ error: "Unable to fetch tags" }),
    };
  }
};

exports.handler = async (event, context) => {
  const db = await connectToDatabase();
  return fetchTagList(db);
};
