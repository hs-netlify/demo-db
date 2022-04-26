import mongoose from "mongoose";

const siteSchema = mongoose.Schema({
  name: String,
  tags: [{ type: ObjectId, ref: "Tag" }],
});

module.exports = mongoose.model("Site", siteSchema);
