const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");

const postRoutes = require("./Routes/Posts");
const userRoutes = require("./Routes/User");

// app.use(cors());
app.use(express.json());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(cookieParser());
// path.join(__dirname,
// app.use("/image", express.static("backend/images"));
app.use(
	cors({
		credentials: true,
		origin: "http://localhost:4200",
	})
);
app.use("/images", express.static(__dirname + "/images"));
app.use(express.static(__dirname + "backend/images"));

// app.use((req, res, next) => {
// 	res.setHeader("Access-Control-Allow-Origin", "*");
// 	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
// 	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT,PATCH, DELETE, OPTIONS");
// 	next();
// });

//connecting mongodb  ?retryWrites=true&w=majority
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log("Connected to Database");
	})
	.catch(error => {
		console.log(error);
		// error.status(401).json({
		// 	message: " Failed to connect to DataBase",
		// });
	});

app.use("/api/posts", postRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
