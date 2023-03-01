const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: { type: String, require: true },
  content: { type: String, requrie: true },
});

module.exports = mongoose.model("posts", postSchema);
