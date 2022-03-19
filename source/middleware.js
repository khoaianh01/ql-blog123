// const { findOne } = require("./models/blogs");
// const { userSchema, userCommentSchema } = require("./joiSchemas");
const User = require("./models/user");
const ExpressError = require("./utils/ExpressError");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    // req.session.returnTo = req.originalUrl

    return res.render("users/login");
  }
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
module.exports.validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, msg);
  } else {
    next();
  }
};
module.exports.validateCommentUser = (req, res, next) => {
  const { error } = userCommentSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, msg);
  } else {
    next();
  }
};
