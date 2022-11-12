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
});
const bookingSchema=new mongoose.Schema({
  username:"String",
  servicename:"String",
  location:"String",
  requestdate:"Date",
  requesttime:"String",
  status:"Number"
});

adminSchema.plugin(passportLocalMongoose);

const Admin=new mongoose.model("Admin",userSchema);
const Service=new mongoose.model("Service",serviceScheam);
const Location=new mongoose.model("Location",locationSchema);
const Booking=new mongoose.model("Booking",bookingSchema);
///Initialize passport for the User Collection

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

///Initialize passport for the Admin Collection



//////////////////////////////////////External Routes///////////////////////////////////////////

require("./routes/login")(app,User,passport); // routes for the login for user and admin
require("./routes/signup")(app,jsonParser,passport,User); // routes for user signup
require("./routes/admin")(app,Admin,passport,Booking);
require("./routes/modify")(app,Service,Location);
require("./routes/dealservices")(app, Location, Service,Booking)


//////////////////////////////////////////////Routes//////////////////////////////////////////

// User Routes
// Home Route 
app.get("/", (req, res) => {

  const Content={ Message: "Hello Welcome to Car Wash",Authenticated:false};
  if(req.isAuthenticated()){

    Content.Authenticated=true;
  
  }
  res.render("home", Content);
});

app.get("/services",(req,res)=>{
  Service.find({},(err,services)=>{

    const Content={Authenticated:false,Services:[]};
    
    if(req.isAuthenticated()){

      Content.Authenticated=true;
    
    }
    if(err){
      console.log(err);
    }
    else if(!services){

    }
    else{
      Content.Services=services;
    }
    res.render("services", Content);

  })
})

app.get("/locations",(req,res)=>{

  Location.find({},(err,locations)=>{

    const Content={ Message: "Locations",Authenticated:false,Locations:[]};
    
    if(req.isAuthenticated()){

      Content.Authenticated=true;
    
    }
    if(err){
      console.log(err);
    }
    else if(!locations){

    }
    else{
      Content.Locations=locations;
    }
    res.render("locations", Content);

  })
  
})

app.get("/franchise",(req,res)=>{

  const Content={ Message: "Franchise",Authenticated:false};
  if(req.isAuthenticated()){

    Content.Authenticated=true;
  
  }
  res.render("franchise", Content);

});


app.get("/bookings",(req,res)=>{
  if(req.isAuthenticated()){

    Booking.find({username:req.user.username},(err,bookings)=>{
      var mybookings=[]
      if(err){
        console.log(err);
      }
      else if(!bookings){

      }
      else{
        
        mybookings=bookings;
      }
      res.render("bookings",{Authenticated:true,Bookings:mybookings});
    })

    

  }
  else{
    res.render("login",{Message: "Express Login",
    Route: "/auth/login/details"})
  }
});

app.get("/bookaservice",(req,res)=>{

  if(req.isAuthenticated()){

    res.render("bookaservice",{Authenticated:true});

  }
  else{
    res.render("login",{Message: "Express Login",
    Route: "/auth/login/details"})
  }
  
});


//listen to the port
app.listen(PORT, () => {
  console.log("Listening at " + PORT);
});
