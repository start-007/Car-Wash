
var submitbutton=document.getElementById("submit");

submitbutton.addEventListener("click",(e)=>{
  e.preventDefault();
  var formEl = document.forms.serviceform;
  const signFormData = new FormData(formEl);
  console.log(signFormData.get("description"));
  fetch("/admin/addservice", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      servicename: signFormData.get("servicename"),
      description:signFormData.get("description"),
    }),
  })
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      document.getElementById("error").innerHTML=data.Message;
      setTimeout(()=>{
        document.getElementById("error").innerHTML="";
      },2000);
      
    })
    .catch(console.log(console.error));
})