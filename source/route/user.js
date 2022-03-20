const express = require("express");
const user_router = express.Router();
const User = require("../controller/user");
const passport = require('passport');

user_router
    .route('/login')
    .get(User.getFormLogin)
    .post(passport.authenticate('local', { failureRedirect: 'user/login' }),User.postFormLogin)
user_router
    .route('/register')
    .get(User.getFormRegister)
    .post(User.postFormRegister);
user_router
    .route('/auth/google')
    .get(passport.authenticate('google',{
      scope: ['profile', 'email']
    }));
user_router
    .route('/auth/google/callback')
    .get(passport.authenticate('google', { failureRedirect: '/user/login' }, ),User.postFormLogin)
user_router.get('/logout', function(req, res, next) {
    console.log('a')
        req.logout();
        res.redirect('/');
      });
module.exports = user_router;