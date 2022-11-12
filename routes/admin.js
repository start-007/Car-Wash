module.exports = function (app,Admin, bcrypt,Booking) {
  
  app.get("/auth/admin/login", (req, res) => {
    res.render("login", {
      User:"Admin",
      Message: "Admin Login",
      Route: "/auth/admin/login/details",
    });
  });
  app.post("/auth/admin/login/details", (req, res) => {
    console.log(req.body);
    console.log(
      req.body.username,
      req.body.password
    );
    Admin.findOne({username:req.body.username},(err,admin)=>{
      if(err){
        console.log(err);
      }
      else if(!admin){
        res.redirect("/admin/loginerror")
      }
      else{
        res.render("admin/adminhome");
      }
    });
    
    
  });
  app.get("/admin/loginerror", (req, res) => {
    res.render("login", {
      User:"Admin",
      Message: "Wrong username or password",
      Route: "/auth/admin/login/details",
    });
  });
  app.get("/admin/addlocation",(req,res)=>{
    
    res.render("admin/addlocation",{Message:"Add Location"});
     
  });
  app.get("/admin/addservice",(req,res)=>{
    res.render("admin/addservice",{Message:"Add service"});
     
  });
  app.get("/admin/bookings",(req,res)=>{
    Booking.find({},(err,bookings)=>{
      var mybookings=[]
      if(err){
        console.log(err);
      }
      else if(!bookings){

      }
      else{
        
        mybookings=bookings;
      }
      res.render("admin/bookings",{Authenticated:true,Bookings:mybookings,Message:"Showing all bookings"});
    })
  });
  app.post("/admin/bookings/filters",(req,res)=>{
    const filters={};
    if(!req.body.location && !req.body.date){
      console.log("entered");
      res.redirect("/admin/bookings")
    }
    if(req.body.location!=""){
      filters.location=req.body.location;
    }
    if(req.body.date!=""){
      filters.requestdate=req.body.date;
    }
    Booking.find(filters,(err,bookings)=>{
      var mybookings=[]
      if(err){
        console.log(err);
      }
      else if(!bookings){

      }
      else{
        
        mybookings=bookings;
      }
      res.render("admin/bookings",{Authenticated:true,Bookings:mybookings,Message:"Showing results for "+req.body.location+","+req.body.date});
    })
  });
  
};
