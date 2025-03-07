const express = require('express');
const router = express.Router();
const BlogPost = require('../models/BlogPost');

// Get all blog posts
router.get('/', async (req, res) => {
  try {
    const posts = await BlogPost.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Admin route to add new posts
router.post('/', async (req, res) => {
  try {
    const newPost = new BlogPost(req.body);
    await newPost.save();
    res.json(newPost);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;