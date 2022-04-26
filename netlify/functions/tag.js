import { connectToDatabase } from "../../utils";

const fetchTagList = (db) => {
  try {
    const tags = db.collection("tags").find({});
    return { statusCode: 200, body: JSON.stringify(tags) };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Unable to fetch tags" }),
    };
  }
};

const addTag = async (db, tag) => {
  try {
    console.log("tag", tag);
    const res = await db
      .collection("tags")
      .findOneAndUpdate(
        { name: tag.name },
        { $set: { ...tag } },
        { new: true, upsert: true }
      );
    return { statusCode: 200, body: JSON.stringify({ msg: "Tag added" }) };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Unable to set tag" }),
    };
  }
};

exports.handler = async (event, context) => {
  if (event.httpMethod === "PUT") {
    const db = await connectToDatabase();
    const tag = JSON.parse(event.body);
    return addTag(db, tag);
  } else
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid request" }),
    };
};
