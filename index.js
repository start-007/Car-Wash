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

///Start the session for the passport.js

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


///User schema

const userSchema=new mongoose.Schema({
  username:"String",
  name:"String",
  phone:"Number",
  password:"String",
});

userSchema.plugin(passportLocalMongoose);

const User=new mongoose.model("User",userSchema);

///Admin schema
const adminSchema=new mongoose.Schema({
  username:"String",
  password:"String",
});
const serviceScheam=new mongoose.Schema({
  servicename:"String",
  description:"String"
});
const locationSchema=new mongoose.Schema({
  branchname:"String",
  address:"String",
  city:"String",
  state:"String",
  zip:"String",
  contact:"String",
})

adminSchema.plugin(passportLocalMongoose);

const Admin=new mongoose.model("Admin",userSchema);
const Service=new mongoose.model("Service",serviceScheam);
const Location=new mongoose.model("Location",locationSchema);

///Initialize passport for the User Collection

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

///Initialize passport for the Admin Collection


//////////////////////////////////////External Routes///////////////////////////////////////////

require("./routes/login")(app,User,passport); // routes for the login for user and admin
require("./routes/signup")(app,jsonParser,passport,User); // routes for user signup
require("./routes/admin")(app,Admin,passport);
require("./routes/modify")(app,Service,Location);



//////////////////////////////////////////////Routes//////////////////////////////////////////


// Home Route 
app.get("/", (req, res) => {

  const Content={ Message: "Hello Welcome to Car Wash",Authenticated:false};
  if(req.isAuthenticated()){

    Content.Authenticated=true;
  
  }
  res.render("home", Content);
});

app.get("/services",(req,res)=>{
  const Content={ Message: "Serives",Authenticated:false};
  if(req.isAuthenticated()){

    Content.Authenticated=true;
  
  }
  res.render("services", Content);
})

app.get("/locations",(req,res)=>{
  const Content={ Message: "Locations",Authenticated:false};
  if(req.isAuthenticated()){

    Content.Authenticated=true;
  
  }
  res.render("services", Content);
})

app.get("/franchise",(req,res)=>{

  const Content={ Message: "Franchise",Authenticated:false};
  if(req.isAuthenticated()){

    Content.Authenticated=true;
  
  }
  res.render("services", Content);

})

//listen to the port
app.listen(PORT, () => {
  console.log("Listening at " + PORT);
});
