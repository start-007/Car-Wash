module.exports = function (app, Location, Service,Booking) {
  //////////////////////////Login///////////////////////////
  app.get("/list/locations",(req,res)=>{
    console.log("getting list");
    Location.find({},(err,locations)=>{
      if(err){
        console.log(err);
      }
      else{
        var cities=[];
        locations.forEach(location => {
          cities.push(location.city);
        });
        res.send(cities);
      }
    })
  });
  
  app.get("/list/services",(req,res)=>{
    console.log("getting services");
    Service.find({},(err,services)=>{
      if(err){
        console.log(err);
      }
      else{
        var myservices=[];
        services.forEach(service => {
          myservices.push(service.servicename);
        });
        res.send(myservices);
      }
    })
  
  });
  
  
  app.post("/user/bookaservice",(req,res)=>{
  
    console.log(req.user,req.body);
  
    req.body.username=req.user.username;
    const bookingdata=new Booking(req.body);
    bookingdata.save((err)=>{
      if(err) console.log(err);
      else res.send({redirect:"/bookings"});
    })
  
    
  })

  //other routes..
};

