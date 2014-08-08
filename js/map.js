

var id = localStorage.getItem("userId");

//set the location of the user
function setLocation() {
    var address = localStorage.getItem("address");
    var latitude = localStorage.getItem("latitude");
    var longitude = localStorage.getItem("longitude");
    var id = localStorage.getItem("userId");


    var inputdata = {
        "UserID": id,
        "latitude": latitude,
        "longitude": longitude,
        "location": address
    };

    $.ajax({
        type: "POST",
        beforeSend: showLoader(),
        //url: "http://localhost:4103/api/User/setLocation",
        url: "http://174.141.233.6/MY6/api/User/setLocation",
        data: inputdata,
        success: function (data) {
         
            console.log(data);
         
        },
        error: function (xhr) {
            //alert(xhr.responseText);
        }
    }).done(function () {
        hideLoader();
    });
}

function FindPeopleByProximitySearch(distance) {
   
   
    var inputdata = {
        "UserID": id,
        "distance": distance
    };

    $.ajax({
        type: "GET",
        beforeSend: showLoader(),
        url: "http://174.141.233.6/MY6/api/User/FindPeopleByProximity",
        data: inputdata,
        success: function (data) {
            console.log(data);
          
            for (var i = 0; i < data.ResponseData.length; i++) {
                var id = data.ResponseData[i].UserID;
               
                var Latitude = data.ResponseData[i].Latitude;
                var Longitude = data.ResponseData[i].Longitude;
                var FirstName = data.ResponseData[i].FirstName;
                var coords = new google.maps.LatLng(Latitude, Longitude);
                var profilepath = data.ResponseData[i].ProfilePicName;
                //  var profilepath = data.ResponseData[i].FacebookProfilePicUrl;


                if (profilepath == null || profilepath == "") {

                    profilepath = "img/white-logo-2.png";
                    codeLatLng1(coords, FirstName, profilepath, id);
                }

                else {

                    profilepath = "http://174.141.233.6/my6/Files/ProfilePictures/" + data.ResponseData[0].ProfilePicName;
                    codeLatLng1(coords, FirstName, profilepath, id);
                }
            }
            
     
        },
        error: function (xhr) {
          //  alert(xhr.responseText);
        }
    }).done(function () {
        hideLoader();
    });
}




function findPeople() {
  
 
    var inputdata = {
        "Interest": 0,
        "UserID": id
    };

    $.ajax({
        type: "GET",
        beforeSend: showLoader(),
        //url: "http://localhost:4103/api/User/FindPeople",
        url: "http://174.141.233.6/MY6/api/User/FindPeople",
        data: inputdata,
        success: function (data) {
            console.log(data);
            for (var i = 0; i < data.ResponseData.length; i++) {
                var id = data.ResponseData[i].UserID;
                var Latitude = data.ResponseData[i].latitude;
                var Longitude = data.ResponseData[i].longitude;
                var FirstName = data.ResponseData[i].FirstName;

                var coords = new google.maps.LatLng(Latitude, Longitude);
                var  profilepath= data.ResponseData[i].ProfilePicName;
                //  var profilepath = data.ResponseData[i].FacebookProfilePicUrl;
                
                
                if (profilepath == null || profilepath == "") {

                    profilepath = "img/white-logo-2.png";
                    codeLatLng1(coords, FirstName, profilepath,id);
                }
                
                else
              	  {
              	  
              	  profilepath= "http://174.141.233.6/my6/Files/ProfilePictures/" + data.ResponseData[i].ProfilePicName;
              	   codeLatLng1(coords, FirstName, profilepath,id);
              	  }
            }
        },
        error: function (xhr) {
           // alert(xhr.responseText);
        }
    }).done(function () {
        hideLoader();
    });
}


function codeLatLng1(coords, FirstName, profilepath,id) {
   
    var marker = new google.maps.Marker({
        position: map.getCenter(),
        map: map,
        title: 'Click to zoom'
    })

  
    geocoder.geocode({ 'latLng': coords }, function (results, status) {
     
        if (status == google.maps.GeocoderStatus.OK) {
            if (results[1]) {
                map.setZoom(11);
                marker = new google.maps.Marker({
                    position: coords,
                    map: map
                });

                google.maps.event.addListener(marker, 'click', function () {
                  
                    map.setZoom(16);
                    map.setCenter(marker.getPosition());
                    var infowindow = new google.maps.InfoWindow({
                        content: '<div class="infowindow" id='+id+' style="height:100px;width:230px;"><img ALIGN="Left" style="height:43px; width:42px" src=' + profilepath + '>' + '<p style="color:green;">' + FirstName + '</p>' +
                            '<p style="color:blue;">' + results[1].formatted_address + '</p></div>'
                            
                    });


                  //  infowindow.setContent(results[1].formatted_address);
                    infowindow.open(map, marker);
                   
                });


          
            }
        } else {
          //  alert("Geocoder failed due to: " + status);
        }
    });
}
function hideLoader() {

	$('#loaderImage').css("display", "none");
	$('.flex').css("display", "none");
}

function showLoader() {

	$('#loaderImage').css("display", "block");
	$('.flex').css("display", "block");
	
}
