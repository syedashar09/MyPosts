const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/check-authentication");
const post = require("../controller/posts");
const storage = require("../middleware/file");

//adding posts to mongodb
router.post("", checkAuth, storage, post.createPosts);

router.get("", post.getPosts);

//Edit method
router.put("/:id", checkAuth, storage, post.EditPost);

//getting single post by id
router.get("/:id", post.getPost);

//deleting posts from mongodbres.status(401).json({ message: "UnAuthorized" });result.deleteCount > 0
router.delete("/:id", checkAuth, post.deletePosts);

module.exports = router;
