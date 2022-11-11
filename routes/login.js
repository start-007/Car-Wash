module.exports = function (app,User,passport) {
  //////////////////////////Login///////////////////////////
  app.get("/auth/login", function (req, res) {
    res.render("login", {
      Message: "Express Login",Route:"/auth/login/details"
    });
  });
  app.get("/auth/admin/login",(req,res)=>{
    res.render("login",{Message:"Admin Login",Route:"/auth/admin/login/details"});
  });
  app.post("/auth/admin/login/details",(req,res)=>{
    console.log(req.body);
  })
  app.post("/auth/login/details", function (req, res) {

    const user=new User({
      username:req.body.username,
      password:req.body.password

    });
    req.login(user,(err)=>{
      if(err){
         console.log(err);
      }
      else{
        
         passport.authenticate("local", {failureRedirect:'/loginerror' })(req,res,()=>{
            console.log("in login");
            res.redirect("/");
         });
         
      }
    })
  });
  app.get("/loginerror",(req,res)=>{
    res.send("fucked");
  })

  //other routes..
};
