const MongoClient = require("mongodb").MongoClient;

exports.handler = async () => {
  return { body: "Working", statusCode: 200 };
};
