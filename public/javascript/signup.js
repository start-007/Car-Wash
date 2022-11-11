var signupsubmit = document.getElementById("submit");
signupsubmit.addEventListener("click", (e) => {
  e.preventDefault();

  var formEl = document.forms.signupform;
  const signFormData = new FormData(formEl);
  console.log(signFormData.get("name"));
  var name=signFormData.get("name");
  var email=signFormData.get("email");
  var userphone=signFormData.get("phone");
  var userpassword=signFormData.get("password");
  var userretypepassword=signFormData.get("retypepassword");
  var errormsg=document.getElementById("error")
  if(userpassword===userretypepassword){
    errormsg.innerHTML="";
    fetch("/auth/signup/details", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name:name,
        username:email,
        phone:userphone,
        password:userpassword
      }),
    })
      .then(function (response) {
        console.log(response);
        return response.json();
      })
      .then(function (data) {
        window.location=data.redirect;
      })
      .catch(console.log(console.error));

  }
  else{
    errormsg.innerHTML="Retyped password doesnot match";
  }

  
});
