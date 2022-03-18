const express = require("express");
const blog_router = express.Router();
const Blog = require("../controller/blog");

blog_router
    .route('/')
    .get(Blog.renderHome) 

module.exports = blog_router;