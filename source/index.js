require('dotenv').config();
const express = require('express');

const ejs = require("ejs");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const path = require("path");
const bcrypt = require('bcrypt');
const Sequelize = require("sequelize");
const mysql = require("mysql");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require("express-session");
const { google } = require("googleapis");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const ExpressError = require("./utils/ExpressError");
const routeBlog = require("./route/blog");
const routeUser = require("./route/user");
const routeTopic = require("./route/topic");
const routeAdmin = require("./route/admin");
const db = require('./models/index');
const User = require('./models/user');
const { Store } = require('express-session');

const secret = process.env.SECRET;
const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const callbackURL =process.env.CALLBACK_URL;
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host:process.env.DB_HOST,
    dialect: 'mysql',
    storage: "./session.mysql"
  });

async function connect(){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}
connect();
const app = express();
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
const store = new SequelizeStore({
  db: sequelize
});
// store.sync({force: true});
app.use(
  session({
    secret:'123',
    resave:false,
    store: store,
    saveUninitialized: true,
    cookie: { secure: false }
  }));
// store.sync({alter:true});
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy({ usernameField: 'email'},

async function(email, password, done) {
    var user = await db.User.findOne(
      { where: {
          email: email
        }
      });
    if (user == null) {
      return done(null, false, { message: 'Incorrect email.' });
    }
    const isCheck  = await bcrypt.compare(password,user.password);
    if (!isCheck) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
  } 
  ));
passport.use(new GoogleStrategy(
      {
        clientID,
        clientSecret,
        callbackURL
      },
      function (token, refreshToken, profile, done) {
        process.nextTick(async function () {
         
          await db.User.findOne({where:{ googleId: profile.id }},
            async function (err, user) {
            if (err) { throw err };
            if (user) {
              return done(null, user);
            } else {
            const  email = profile.emails[0].value; 
            const   googleId = profile.id;
            await  db.User.create(
                { googleId,email})
                .then((newUser) =>{ return done(null, newUser);})
               
            }
            })})}));

passport.serializeUser(function(user, done) {
 
  done(null, user.id);

});

passport.deserializeUser(function(id, done) {
  
  db.User.findOne({where:{id:id}}, function (err, user) {
    console.log(user)
     done(err, user);
  });

});
// app.use((req,res,next)=>{
// console.log(req);
// next()
// })
app.use('/home',routeBlog);
// app.use('/adminn',routeAdmin);
app.use('/user',routeUser);
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) {
    err.message = "Oh No, Something Went Wrong!";
  }

  res.status(statusCode).render("error", { err });
});
app.listen('3500', (req,res) =>{
  console.log(`da ket noi 3500`);
});