module.exports = function (app, User, passport) {
  //////////////////////////Login///////////////////////////
  app.get("/auth/login", function (req, res) {
    res.render("login", {
      User:"User",
      Message: "Express Login",
      Route: "/auth/login/details",
    });
  });
  app.post("/auth/login/details", function (req, res) {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
    });
    req.login(user, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("login");
        passport.authenticate("local", { failureRedirect: "/loginerror" })(
          req,
          res,
          () => {
            console.log("in login");
            res.redirect("/");
          }
        );
      }
    });
  });
  app.get("/loginerror", (req, res) => {
    res.render("login", {
      User:"User",
      Message: "Wrong username or password",
      Route: "/auth/login/details",
    });
  });
  app.get("/logout",(req,res)=>{
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  })

  //other routes..
};
