const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
	title: { type: String, require: true },
	content: { type: String, requrie: true },
	imagePath: { type: String, require: true },
	creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true },
});
// const Post = Post;

module.exports = mongoose.model("Post", postSchema);
