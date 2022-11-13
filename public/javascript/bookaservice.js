fetch("/list/locations", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then(function (response) {
    console.log(response);
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    var datalist = document.getElementById("locations");
    data.forEach((city) => {
      var item = document.createElement("option");
      item.value = city;
      item.innerHTML = city;
      datalist.appendChild(item);
    });
  })
  .catch(console.log(console.error));

fetch("/list/services", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then(function (response) {
    console.log(response);
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    var datalist = document.getElementById("services");
    data.forEach((service) => {
      var item = document.createElement("option");
      item.value = service;
      item.innerHTML = service;
      datalist.appendChild(item);
    });
  })
  .catch(console.log(console.error));

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (pos) {
      //You have your locaton here
      console.log(
        "Latitude: " +
          pos.coords.latitude +
          "Longitude: " +
          pos.coords.longitude
      );
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

var submitbutton = document.getElementById("submit");

submitbutton.addEventListener("click", (e) => {
  e.preventDefault();
  var formEl = document.forms.fillform;
  var loc = document.getElementById("location");
  const signFormData = new FormData(formEl);
  console.log(signFormData.get("time"));
  console.log(loc.value);
  fetch("/user/bookaservice", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      servicename: signFormData.get("service"),
      location: loc.value,
      requestdate: signFormData.get("date"),
      requesttime: signFormData.get("time"),
      status: 1,
    }),
  })
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      window.location = data.redirect;
    })
    .catch(console.log(console.error));
});

var date = document.getElementById("date");
date.addEventListener("change", (e) => {
  console.log("Changed");
  var formEl = document.forms.fillform;
  var loc = document.getElementById("location");
  const signFormData = new FormData(formEl);
  fetch("/list/slots", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      location: loc.value,
      requestdate: signFormData.get("date"),
    }),
  })
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var form = document.getElementById("fillform");
      var radios = form.querySelectorAll("input[type=radio]");
      var i,
        k = 0;
      for (k = 0; k < data.length; ++k) {
        for (i = 0; i < radios.length; i++) {
          var radio = radios[i];
          if (data[k] === radio.value) {
            radio.disabled = true;
            console.log(radio.nextSibling.innerHTML);
          }
        }
      }
      if (data.length == 5) {
        document.getElementById("slotserror").innerHTML =
          "Sorry no slots are available on this date";
      }
    })
    .catch(console.log(console.error));
});

// function initMap() {
//   // Google maps are now initialized.
//   getLatLngByZipcode(518124);
// }
// function getLatLngByZipcode(zipcode)
// {
//     console.log("Entered");
//     var geocoder = new google.maps.Geocoder();
//     var address = zipcode;
//     geocoder.geocode({ 'address': 'zipcode '+address }, function (results, status) {
//         if (status == google.maps.GeocoderStatus.OK) {
//             var latitude = results[0].geometry.location.lat();
//             var longitude = results[0].geometry.location.lng();
//             alert("Latitude: " + latitude + "\nLongitude: " + longitude);
//         } else {
//             alert("Request failed.")
//         }
//     });
//     return [latitude, longitude];
// }
