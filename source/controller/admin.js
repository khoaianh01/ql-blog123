const db = require('../models/index');
const Blog = require('../models/blog');
const Topic = require('../models/topic');

module.exports.renderCreatBlog  = async (req, res, next) => {
   const topics = await db.Topic.findAll({})

   res.render('admins/addpost',{topics})
}
module.exports.postCreateBlog = async (req, res, next) => {
   
   
   const topicTitle = req.body.topictitle;
   const {title,des,content} = req.body;
   const topic = await db.Topic.findOne({where:{title: topicTitle}});
   const blog = await db.Blog.create({title,des,content,avata:null,TopicId:topic.id});

   res.redirect('/admin/addblog');

}
module.exports.renderBlogTopic = async (req, res) => {
   const topics = await db.Topic.findAll({include:{model:db.Blog}})
   res.render("admins/index", { topics });
 };
 module.exports.renderAddTopic =async (req, res) => {
 

   res.render("admins/addtopic");
 };
 module.exports.renderEditTopic = async (req, res) => {
   const id = req.params.id;
   const topic = await db.Topic.findOne({where:{id:id}})
    res.render("admins/edittopic",{topic});
 }
 module.exports.editTopic = async (req, res)=>{
   const title = req.body.title;
   const id = req.params.id;
   const topic = await db.Topic.update({title:title},{where:{id:id}})
   res.redirect("/admin/index");
 }
 module.exports.postAddTopic = async (req, res) => {
    console.log(req.body)
    const title = req.body.title;
    const topics = await db.Topic.create({title:title})
    res.redirect('/admin/addtopic')
 }
module.exports.renderEditBlog = async (req, res) => {
   console.log('--------------------------------')
   const { topicid, postid } = req.params;
   const blog = await db.Blog.findOne({where:{id:postid}});
   const topics = await db.Topic.findAll({});
   res.render("admins/editpost", { blog, topics, topicid });
}
module.exports.putEditBlog = async (req, res) => {
 
   const { postid } = req.params;
   const topictitle = req.body.topictitle;
   const { title,des,content }  = req.body;
   const topic = await db.Topic.findOne({ where:{title:topictitle }});
   const topicId = topic.id;
   const blog = await db.Blog.update({title,des,content,TopicId:topicId },{where:{id:postid}})
   res.redirect("/admin/index");

}

module.exports.deleteBlog = async (req, res) => {
   const id = req.params.postid;
   const topic = await db.Blog.destroy({where:{id:id}})
   res.redirect("/admin/index")
}