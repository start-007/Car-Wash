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
  app.post("/list/slots",(req,res)=>{
    console.log("getting slots",req.body);
    Booking.find(req.body,(err,services)=>{
      if(err){
        console.log(err);
      }
      else{
        var slots=[];
        services.forEach(service => {
          if(service.status===1 || service.status===0)
            slots.push(service.requesttime);
        });
        res.send(slots);
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
  });


  app.get("/admin/decision/:status/:username/:location/:servicename/:date/:time",(req,res)=>{


    console.log("in booking entered");
    Booking.findOne({username:req.params.username,servicename:req.params.servicename,location:req.params.location,requestdate:req.params.date,requesttime:req.params.time},(err,booking)=>{

      if(err){
        console.log(err);
      }
      else if(!booking){
        console.log("no booking");
        res.render("admin/adminhome")
      }
      else{
        console.log(booking);
        if(req.params.status==="accept"){
          booking.status=0;
        }
        else{
          booking.status=2;
        }
        booking.save((err)=>{
          if(err) console.log(err);
          else res.redirect("/admin/bookings");
        });
        
        
        
      }

    })

  });

  //other routes..
};

