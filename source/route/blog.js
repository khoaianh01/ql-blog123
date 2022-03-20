const express = require("express");
const blog_router = express.Router();
const Blog = require("../controller/blog");
const catchAsync = require("../utils/catchAsync");

blog_router
    .route('/')
    .get(catchAsync(Blog.renderHome));
blog_router
    .route('/post/:id')
    .get(catchAsync(Blog.renderBlogTopic))
blog_router.route('/:id')
    .get(catchAsync(Blog.showBlog));
module.exports = blog_router;