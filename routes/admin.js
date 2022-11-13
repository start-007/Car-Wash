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
        admin.status=1;
        admin.save();
        res.redirect("/admin/bookings");
      }
    });
    
    
  });
  app.get("/auth/admin/logout",(req,res)=>{

    Admin.find({},(err,admin)=>{
      if(err){
        console.log(err);
      }
      else if(!admin){
        res.redirect("/admin/loginerror")
      }
      else{
        admin[0].status=0;
        admin[0].save();
        res.redirect("/");
      }
    });

  })
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
        
        bookings.forEach(booking => {
          if(booking.status===1){
            mybookings.push(booking);
          }
        });
      }
      res.render("admin/bookings",{Authenticated:true,Bookings:mybookings,Message:"Showing all pending bookings"});
    })
  });
  app.post("/admin/bookings/filters",(req,res)=>{
    const filters={};
    console.log(req.body);
    if(!req.body.location && !req.body.date && !req.body.status){
      console.log("entered");
      res.redirect("/admin/bookings")
      return;
    }
    if(req.body.location){
      filters.location=req.body.location;
    }
    if(req.body.date){
      filters.requestdate=req.body.date;
    }

    if(req.body.status==="Rejected"){
      filters.status=2;
    }
    else if(req.body.status==="Accepted"){
      filters.status=0;
    }
    else{
      filters.status=1;
    }
  
    console.log(filters);
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
      res.render("admin/bookings",{Authenticated:true,Bookings:mybookings,Message:"Showing results for "+req.body.location+" "+req.body.date+" "+req.body.status});
    })
  });
  
};
