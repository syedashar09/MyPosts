const express = require('express');
const { model } = require('mongoose');

const Post = require('../Models/post');

const router = express.Router();



//adding posts to mongodb
router.post("", (req, res, next) => {
    // const post = req.body;
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
    });
    post.save().then((createdPost) => {
      console.log(post);
      res.status(201).json({
        message: "Post Added Successfully",
        paramId: createdPost._id,
      });
    });
  });
  
  //getting posts from mongodb
  router.get("", (req, res, next) => {
    // const posts = [
    //   {
    //     id: "fadf12421l",
    //     title: "First server-side post",
    //     content: "This is coming from the server",
    //   },
    //   {
    //     id: "ksajflaj132",
    //     title: "Second server-side post",
    //     content: "This is coming from the server!",
    //   },
    // ];
  
    Post.find().then((documents) => {
      res.status(200).json({
        message: "Posts fetched Successfully!",
        posts: documents,
      });
    });
  });
  
  //getting single post by id
  router.get("/:id", (req, res, next) => {
    Post.findById(req.params.id).then((result) => {
      if (result) {
        console.log(result);
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: "Post not Found" });
      }
    });
  });
  
  //deleting posts from mongodb
  router.delete("/:id", async (req, res, next) => {
    await Post.findOneAndDelete({ _id: req.params.id }).then((result) => {
      console.log(result);
      res.status(200).json({
        message: "Posts Deleted",
      });
    });
  });
  
  //Edit method
  router.put("/:id", (req, res, next) => {
    const post = new Post({
      _id: req.body.id,
      title: req.body.title,
      content: req.body.content,
    });
    Post.updateOne({ _id: req.params.id }, post).then((result) => {
      console.log(result);
      res.status(200).json({
        message: "Post Update",
      });
    });
  });

module.exports = router;