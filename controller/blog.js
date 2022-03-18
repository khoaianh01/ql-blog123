const db = require('../models/index');
const Blog = require('../models/blog');


module.exports.renderHome = async (req, res, next) => {

  const blogs = await db.Blog.findAll({});
  res.render('blogs/index',{blogs})

}