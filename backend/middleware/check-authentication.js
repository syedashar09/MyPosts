const jwt = require("jsonwebtoken");
const { async } = require("rxjs");
const { JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
	const token = req.headers.authorization.split(" ")[1];

	if (!token) {
		return res.status(401).json({
			message: "You are not Authenticated",
		});
	}
	// const decodedToken =req.headers.authorization.split(" ")[1] ||function (err, decode)
	try {
		const userData = jwt.verify(token, JWT_SECRET);

		req.userData = { email: userData.email, userId: userData.userId };
		next();
		console.log("userData:", userData);
	} catch (e) {
		res.status(401).json({ message: "You are not Authenticated!" });
	}
};

// if (err) {
// 	req.userData = undefined;
// 	res.status(500).send({
// 		message: err,
// 	});
// }
// if (!decode) {
// 	res.status(500).send({
// 		message: "Auth Failed",
// 	});
// } else {}

//catch here

// res.status(401).json({
// 		message: "You are not Authenticated",
// 	});

// User = require("../Models/user");

// const verifyToken = (req, res, next) => {
// 	if (req.headers && req.headers.authorization && req.headers.authorization.split(" ")[0] === "JWT") {
// 		jwt.verify(req.headers.authorization.split(" ")[1], jwt_secret, function (err, decode) {
// 			if (err) req.user = undefined;

// 			decode((err, user) => {
// 				if (err) {
// 					res.status(500).send({
// 						message: err,
// 					});
// 				} else {
// 					req.userData = { email: user.email, userId: user._id };
// 					console.log(req.user);

// 					next();
// 				}
// 			});
// 		});
// 	} else {
// 		req.user = undefined;
// 		next();
// 	}
// };

// module.exports = verifyToken;
