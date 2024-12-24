const User = require("../Models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { async } = require("rxjs");
const { JWT_SECRET } = process.env;

exports.createdUser = (req, res, next) => {
	const salt = bcrypt.genSalt(10);
	const hashedPassword = bcrypt.hash(req.body.password, salt);
	const user = new User({
		email: req.body.email,
		username: req.body.username,
		password: hashedPassword,
	});
	const result = user
		.save()
		.then(createdUser => {
			res.status(201).json({
				message: "User created!",
				createdUser: createdUser,
			});
			res.send(result);
		})
		.catch(() => {
			res.status(500).json({
				message: "Invalid Authentication Credentials",
			});
		});
};

exports.login = (req, res, next) => {
	let fetchedUser;
	const expiresIn = "1h";

	User.findOne({
		email: req.body.email,
	})
		.exec()
		.then(user => {
			if (!user) {
				return res.status(404).json({ message: "User Not Found!" }).send();
			}
			// try {
			fetchedUser = user;
			return bcrypt.compare(req.body.password, user.password);
			// } catch (e) {
			// 	res.status(40)
			// }
		})
		.then(result => {
			if (!result) {
				return res.status(400).json({
					message: "invalid credentials",
				});
			}
			const token = jwt.sign({ email: fetchedUser.email, userId: fetchedUser._id }, JWT_SECRET, {
				algorithm: "HS256",
				expiresIn: expiresIn,
			});
			if (!token) {
				res.status(404).json({ message: "invalid credentials." });
			}
			// .cookie("jwt", token, { httpOnly: true })
			res.status(200)
				.json({
					token: token,
					expiresIn: 3600,
					userId: fetchedUser._id,
				})
				.send();
		})
		.catch(err => {
			res.status(400).json({
				message: "invalid credentials",
			});
		});
};
