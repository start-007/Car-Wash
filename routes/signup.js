module.exports = function (app, mongoose, jsonParser) {
  ////////////////////////Signup/////////////////////////
  app.get("/auth/signup", function (req, res) {
    res.render("signup", {
      Message: "Express Signup",
    });
  });

  app.post("/auth/signup/details", jsonParser, function (req, res) {
    console.log(
      req.body.name,
      req.body.phone,
      req.body.email,
      req.body.password
    );
    res.send({ Message: "ok" });
  });

  //other routes..
};
