module.exports = function (app,Service, Location) {
  
  app.post("/admin/addlocation",(req,res)=>{

    console.log(req.body);
    const location = new Location(req.body);
    location.save(function (err) {
    if (err) res.send({Message:"Error occured, try after sometime"});
    else res.send({Message:"Successfully added the location to the database"});
    });
    

  });
  app.post("/admin/addservice",(req,res)=>{
    console.log(req.body);
    const service = new Service(req.body);
    service.save(function (err) {
    if (err) res.send({Message:"Error occured, try after sometime"});
    else res.send({Message:"Successfully added the service to the database"});
    });

  });

};
