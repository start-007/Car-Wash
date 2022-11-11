const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose=require("mongoose");
const session=require("express-session");
const passport=require("passport");
const passportLocalMongoose=require("passport-local-mongoose");

const PORT=process.env.PORT || 3000; 


app.use(express.static("/public"));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
   extended: true
 }));


app.use(session({
   secret:"Our little secret.",
   resave:false,
   saveUninitialized:false,

}));

app.use(passport.initialize());

app.use(passport.session());

//////////////////////////////////////////////Routes//////////////////////////////////////////

app.get("/",(req,res)=>{
  res.render("Home",{Message:"Hello Welcom to Car Wash"});
})

app.listen(PORT,()=>{
  console.log("Listening at "+PORT);
})