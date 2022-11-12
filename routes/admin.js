module.exports = function (app,Admin, passport) {
  
  app.get("/auth/admin/login", (req, res) => {
    res.render("login", {
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
    
  });
  app.get("/admin/loginerror", (req, res) => {
    res.render("login", {
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
    res.render("admin/bookings",{Message:"bookings"});
  });
  
};
