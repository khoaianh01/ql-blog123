const express = require("express");
const blog_router = express.Router();
const Blog = require("../controller/blog");
const { isAdmin, isLoggedIn } = require("../middleware");
blog_router
    .route('/')
    .get(Blog.renderHome);
blog_router
    .route('/post/:id')
    .get(Blog.renderBlogTopic)

module.exports = blog_router;