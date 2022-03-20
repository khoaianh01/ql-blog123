const User = require("./models/user");
const ExpressError = require("./utils/ExpressError");
const db = require("./models/index");
const Session = require("./models/session");
const { blogModel, topicModel } = require("./joiModel");

module.exports.isLoggedIn =async (req, res, next) => {
  const sessionID = req.sessionID;
  const data = await db.Session.findOne({ where: {sid: sessionID}});
  console.log(data);
  // if(!data.cookie){
  //     res.redirect('user/login');
  // }
  
  next();
};
module.exports.isAdmin = async (req, res, next) => {
  const role = req.user.roles;
  if (role === "admin") {
    next();
  } else {
    res.redirect("/home");
  }
};
module.exports.validateBlog = (req, res, next) => {
  const { error } = blogModel.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, msg);
  } else {
    next();
  }
};
module.exports.validateTopic = (req, res, next) => {
  const { error } = topicModel.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, msg);
  } else {
    next();
  }
};
