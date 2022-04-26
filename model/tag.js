import mongoose from "mongoose";

const tagSchema = mongoose.Schema({
  name: String,
});

module.exports = mongoose.model("Tag", tagSchema);
