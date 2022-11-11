module.exports = function (app, mongoose, jsonParser) {
  //////////////////////////Login///////////////////////////
  app.get("/auth/login", function (req, res) {
    res.render("login", {
      Message: "Express Login",Route:"/auth/login"
    });
  });
  app.get("/auth/admin/login",(req,res)=>{
    res.render("login",{Message:"Admin Login",Route:"/auth/admin/login/details"});
  });
  app.post("/auth/admin/login/details",(req,res)=>{
    console.log(req.body);
  })
  app.post("/auth/login/details", function (req, res) {
    console.log(req.body);
    res.send(req.body);
  });

  //other routes..
};
