const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
	email: { type: String, require: true, unique: true },
	username: { type: String },
	password: { type: String, require: true },
});
// unique validator is depriciated, keyword is enogh

module.exports = mongoose.model("User", userSchema);
