const express = require("express");
const admin_router = express.Router();
const Admin = require("../controller/admin");

const { isLoggedIn, isAdmin,validateBlog,validateTopic } = require("../middleware");

admin_router
     .route("/index")
     .get(Admin.renderBlogTopic)
admin_router
     .route("/addtopic")
     .get(Admin.renderAddTopic)
     .post(validateTopic,Admin.postAddTopic)
admin_router
     .route('/edit/edittopic/:id')
     .get(Admin.renderEditTopic)
     .put(Admin.editTopic)
admin_router
     .route("/addblog")
     .get(Admin.renderCreatBlog)
     .post(validateBlog,Admin.postCreateBlog)
admin_router
     .route("/edit/editpost/:topicid/post/:postid")
     .get(Admin.renderEditBlog)
     .put(Admin.putEditBlog)
admin_router
     .route("/edit/deletepost/:topicid/post/:postid")
     .delete(Admin.deleteBlog)
module.exports = admin_router;