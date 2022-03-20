const db = require('../models/index');
const Blog = require('../models/blog');
const Topic = require('../models/topic');

module.exports.renderHome = async (req, res, next) => {
  const PAGE_SIZE = 6;
 
  let idPage = req.query.page || 1;
  
  const blogs = await db.Blog.findAll({});
  
  const countBlogs = blogs.length;
  const blogPage = await db.Blog.findAll({
    offset: (PAGE_SIZE*idPage)-PAGE_SIZE,
    limit: PAGE_SIZE  
  })
  
  const views = await db.Blog.findAll({
    order:[['view','DESC']]
  })
  console.log()

  idPage++;
  const topics = await db.Topic.findAll({include:{model:db.Blog}});
 
  res.render('blogs/index',{ blogPage,
    topics,
    views,
    idPage,
    PAGE_SIZE
    });

}
module.exports.renderBlogTopic = async (req, res) => {
 
  let idPage = req.query.page || 1;
  const PAGE_SIZE = 6;
  const id = req.params.id;
  const blogTopics = await db.Topic.findOne(
    {where:{id:id},
    include:
    [{ model : db.Blog,
      offset: (PAGE_SIZE*idPage)-PAGE_SIZE,
      limit: PAGE_SIZE 
    }]
  }
  );
  console.log(blogTopics.Blogs[0])
  const topic = await db.Topic.findOne({where:{id}});
  const views = await db.Blog.findAll({
    order:[['view','DESC']]
  })
  const topics = await db.Topic.findAll({include:{model:db.Blog}});
  idPage++;
  res.render("blogs/post", {
    blogTopics,
    topics,
    topic,
    views,
    idPage,
    PAGE_SIZE
  });
}
module.exports.showBlog = async (req, res)=>{
  const { id } = req.params;
  const post = await db.Blog.findOne({where: {id}});
  const blogs = await db.Blog.findAll({});
  const topics = await db.Topic.findAll({include:{model:db.Blog}})
  post.view++;
  await post.save();
  const views = await db.Blog.findAll({
    order:[['view','DESC']]
  })
  let qtyBlog = blogs.length;
  let relatedPosts = [];
  for (let i = 0; i < 3; i++) {
    let vt = Math.floor(Math.random() * qtyBlog);
    relatedPosts.push(blogs[vt]);
  }
  
  res.render("blogs/show", {
    post,
    blogs,
    topics,
    views,
    relatedPosts
  });
}