
var submitbutton=document.getElementById("submit");

submitbutton.addEventListener("click",(e)=>{
  e.preventDefault();
  var formEl = document.forms.locationform;
  const signFormData = new FormData(formEl);
  console.log(signFormData.get("branchname"));
  fetch("/admin/addlocation", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      branchname: signFormData.get("branchname"),
      contact:signFormData.get("contact"),
      address: signFormData.get("address"),
      city:signFormData.get("city"),
      state: signFormData.get("state"),
      zip: signFormData.get("zip"),
    }),
  })
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      document.getElementById("error").innerHTML=data.Message;
    })
    .catch(console.log(console.error));
})