const db = require('../models/index');
const Blog = require('../models/blog');
const Topic = require('../models/topic');

module.exports.getCreatBlog  = async (req, res, next) => {

   res.render('admin/addpost')

}