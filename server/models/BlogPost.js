const mongoose = require('mongoose');

const BlogPostSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('BlogPost', BlogPostSchema);