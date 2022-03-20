"use strict";

var express = require("express");

var blog_router = express.Router();

var Blog = require("../controller/blog");

var _require = require("../middleware"),
    isAdmin = _require.isAdmin,
    isLoggedIn = _require.isLoggedIn;

blog_router.route('/').get(Blog.renderHome);
blog_router.route('/post/:id').get(Blog.renderBlogTopic);
module.exports = blog_router;