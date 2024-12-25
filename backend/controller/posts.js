const Post = require('../Models/post');

exports.createPosts = (req, res, next) => {
	const url = req.protocol + '://' + req.get('host');

	const post = new Post({
		title: req.body.title,
		content: req.body.content,
		imagePath: url + '/images/' + req.file.filename,
		creator: req.userData.userId,
	});
	post.save()
		.then((createdPost) => {
			res.status(201).json({
				message: 'Post Added Successfully',
				Post: {
					...createdPost,
					id: createdPost._id,
				},
			});
		})
		.catch((err) => {
			res.status(500).json({
				messgae: 'UnAuthorized',
			});
		});
};

//getting posts from mongodb
exports.getPosts = (req, res, next) => {
	const pageSize = +req.query.pagesize;
	const page = +req.query.page;

	const postQuery = Post.find();
	let fetchedPosts;
	//limiting page size
	postQuery.skip(pageSize * (page - 1)).limit(pageSize);

	postQuery
		.then((documents) => {
			fetchedPosts = documents;
			return Post.count();
		})
		.then((count) => {
			res.status(200).json({
				message: 'Posts fetched Successfully!',
				posts: fetchedPosts,
				maxPosts: count,
			});
		})
		.catch((err) => {
			res.status(405).json({
				messgae: 'Error in Fetching Posts',
			});
		});
};

exports.getPost = (req, res, next) => {
	Post.findById(req.params.id)
		.then((result) => {
			console.log(result);
			if (!result) {
				res.status(404).json({ message: 'Post not Found' });
			}
			res.status(200).json(result);
		})
		.catch((err) => {
			res.status(405).json({
				messgae: 'Error in Fetching Post',
			});
		});
};

exports.EditPost = (req, res, next) => {
	let imagePath = req.body.imagePath;
	if (req.file) {
		const url = req.protocol + '://' + req.get('host');
		imagePath = url + '/images/' + req.file.filename;
	}
	console.log(imagePath);
	const post = new Post({
		_id: req.body.id,
		title: req.body.title,
		content: req.body.content,
		imagePath: imagePath,
		creator: req.userData.userId,
	});

	Post.updateOne({ _id: req.params.id, creator: req.userData.userId }, post)
		.then((result) => {
			console.log(result);
			if (result) {
				res.status(200).json({
					message: 'Posts Updated',
				});
			} else {
				res.status(401).json({ message: 'UnAuthorized' });
			}
		})
		.catch((err) => {
			res.status(405).json({
				messgae: 'Error in Updating Post',
			});
		});
};

exports.deletePosts = (req, res, next) => {
	Post.findOneAndDelete({ _id: req.params.id, creator: req.userData.userId })
		.then((response) => {
			console.log(response);
			if (!response) {
				res.status(401).json({ message: 'UnAuthorized' });
			}
			res.status(200).json({
				message: 'Posts Deleted',
			});
		})
		.catch((error) => {
			res.status(500).json({
				message: 'Error in Deleting Post',
			});
		});
};
