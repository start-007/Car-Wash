const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const PORT = process.env.PORT || 3000;

var jsonParser = bodyParser.json();

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.set("view engine", "ejs");
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(
  session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());

app.use(passport.session());


/////////////////////////////////////MongoDB///////////////////////////////////////////////////

mongoose.connect("mongodb://localhost:27017/carwashDB",{useNewUrlParser:true});

const userSchema=new mongoose.Schema({
  username:"String",
  name:"String",
  phone:"Number",
  password:"String",
});

userSchema.plugin(passportLocalMongoose);

const User=new mongoose.model("User",userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//////////////////////////////////////External Routes///////////////////////////////////////////

require("./routes/login")(app,User,passport);
require("./routes/signup")(app,jsonParser,passport,User);




//////////////////////////////////////////////Routes//////////////////////////////////////////

app.get("/", (req, res) => {
  res.render("home", { Message: "Hello Welcom to Car Wash" });
});

app.get("/home",(req,res)=>{
  res.send("Loggind");
})

app.listen(PORT, () => {
  console.log("Listening at " + PORT);
});
