module.exports = function (app, jsonParser, passport,User) {
  ////////////////////////Signup/////////////////////////
  app.get("/auth/signup", function (req, res) {
    res.render("signup", {
      Message: "Express Signup",
    });
  });

  app.post("/auth/signup/details", jsonParser, function (req, res) {
    console.log(
      req.body.username,
      req.body.phone,
      req.body.name,
      req.body.password
    );
    User.register(
      {
        username: req.body.username,
        name: req.body.name,
        phone: req.body.phone,
      },
      req.body.password,
      (err, user) => {
        if (err) {
          console.log(err);
          res.send({redirect: '/auth/login'});
        } else {
          
          passport.authenticate("local")(req, res, () => {
            res.send({redirect: '/'});
          });
        }
      }
    );
    //res.send({ Message: "ok" });
  });


  //other routes..
};
