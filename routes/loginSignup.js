module.exports = function (app, mongoose) {

  //////////////////////////Login///////////////////////////
  app.get("/auth/login", function (req, res) {
    res.render("login", {
      Message: "Express Login",
    });
  });

  app.post("/auth/login/details", function (req, res) {
    console.log(req.body);
    res.send(req.body);
  });

  ////////////////////////Signup/////////////////////////
  app.get("/auth/signup", function (req, res) {
    res.render("signup", {
      Message: "Express Signup",
    });
  });

  app.post("/auth/signup/details", function (req, res) {
    console.log(
      req.body.name,
      req.body.phone,
      req.body.email,
      req.body.password,
      req.body.retypepassword
    );
  });

  //other routes..
};
