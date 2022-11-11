var signupsubmit = document.getElementById("submit");
signupsubmit.addEventListener("click", (e) => {
  e.preventDefault();

  var formEl = document.forms.signupform;
  const signFormData = new FormData(formEl);
  console.log(signFormData.get("name"));
  var username=signFormData.get("name");
  var useremail=signFormData.get("email");
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
        name:username,
        email:useremail,
        phone:userphone,
        password:userpassword
      }),
    })
      .then(function (response) {
        console.log(response);
        return response.json();
      })
      .then(function (data) {
        console.log(data);
      })
      .catch(console.log(console.error));

  }
  else{
    errormsg.innerHTML="Retyped password doesnot match";
  }

  
});
