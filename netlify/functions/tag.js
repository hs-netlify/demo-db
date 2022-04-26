import { connectToDatabase } from "../../utils";

const fetchTagList = (db) => {
  try {
    const tags = db.collection("tags").find({});
    return { statusCode: 200, body: JSON.stringify(tags) };
  } catch (error) {
    console.log(error);
    return { statuCode: 500, body: { error: "Unable to fetch tags" } };
  }
};

exports.handler = (event, context) => {
  const db = connectToDatabase();
  if (event.httpMethod === "GET") {
  } else if (event.httpMethod === "PUT") {
    return { statusCode: 200 };
  }
};
