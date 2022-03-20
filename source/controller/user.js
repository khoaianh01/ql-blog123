const db = require('../models/index');
const User = require('../models/user');
const Topic = require('../models/topic');
const bcrypt = require('bcrypt');
const passport = require('passport');

module.exports.getFormLogin = async (req,res)=>{
   
    res.render("users/login");
}
module.exports.postFormLogin = async (req,res,next)=>{
  console.log('abc')
  res.redirect("/home");
}
module.exports.getFormRegister = async (req,res)=>{
    res.render("users/register");
}
module.exports.postFormRegister = async (req,res,next)=>{
    const {email, password} = req.body;
   
            const salt = await bcrypt.genSalt(6);
            const hast = await bcrypt.hash(password,salt);
         
    
    const isChkeck = await db.User.findOne({where:{email: email}});
    if(isChkeck){
        res.redirect('/user/register');
    }
    const user = await db.User.create({email,password:hast,salt});
 
    if (user) {
        passport.authenticate('local', function(err, user) {
          if (err) { return next(err); }
          if (!user) {
          
            return res.send('lỗi');
          }
          
          req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.redirect('/home');
          })
        })(req, res,next)}
}
