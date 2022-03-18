const express = require('express');

const ejs = require("ejs");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const path = require("path");
const Sequelize = require("sequelize");
const mysql = require("mysql");
const routeBlog = require("./route/blog");
const routeUser = require("./route/user");
const routeTopic = require("./route/topic");
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host:process.env.DB_HOST,
    dialect: 'mysql'
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

app.use('/home',routeBlog);
// app.use('/user',routeUser);
// app.use('/topic',routeTopic);

app.get('/',(req,res)=>{
    res.send('ok');
})


app.listen('3003',(req,res) =>{
console.log('listening on')
})