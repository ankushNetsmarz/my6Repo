
var userProfileid = localStorage.getItem("profileId");
var userId = localStorage.getItem("userId");

function GetProfileData() {

    var inputdata = {
        "UserID": userProfileid
    };

    $.ajax({
        type: "GET",
        beforeSend: showLoader(),
        //url: "http://localhost:4103/api/User/GetUserData",
        url: "http://174.141.233.6/MY6/api/User/GetUserData",
        data: inputdata,
        success: function (data) {
            console.log(data);
            var rating = data.ResponseData[0].UserRating;
          
            var FirstName = data.ResponseData[0].FirstName;
            var LastName = data.ResponseData[0].LastName;
            var Name = FirstName + " " + LastName;
            var Gender = data.ResponseData[0].Gender;
            var DOB = data.ResponseData[0].DOB;
            var LocationAddress = data.ResponseData[0].LocationAddress;
            var interests = data.ResponseData[0].interests;
       
            var profilepath= data.ResponseData[0].ProfilePicName;
            var Status=data.ResponseData[0].Status;
            if(Status == null)
            	{
            
            	Status = "";
            	}
            //  var profilepath = data.ResponseData[i].FacebookProfilePicUrl;
               
              
                if (profilepath == null || profilepath == "") {

                    profilepath = "img/white-logo-2.png";
                }
                
                else
              	  {
              	  
              	  profilepath= "http://174.141.233.6/my6/Files/ProfilePictures/" + data.ResponseData[0].ProfilePicName;
              	  }

               $('#rateit5').rateit('value', rating);
            $("#seeName").text(Name);
            $("#seeGender").text(Gender);
            $("#seeLocation").text(LocationAddress);
            $("#seeDOB").text(DOB);
            $("#seeinterest").text(interests);
            $(".profile-status").text(Status);
            var interest = interests.split("|");

            for (var i = 0; i < 6; i++) {
                       switch (interest[i]) {
                           case "My talents":
                               $("#1").show();
                               break;
                           case "My Arts":
                               $("#2").show();
                               break;
                           case "My Nightlife":
                               $("#3").show();
                               break;
                           case "My Lifestyle":
                               $("#4").show();
                               break;
                           case "My Resale":
                               $("#5").show();
                               break;
                           case "My Retails":
                               $("#6").show();
                               break;
                           case "My Dating":
                               $("#7").show();
                               break;
                           case "My Foods":
                               $("#9").show();
                               break;
                           case "My Sports":
                               $("#8").show();
                               break;
                           case "Entertainment":
                               $("#10").show();
                               break;
                        
                       }
                   }


              
            var new_Img = document.getElementById("profilepic");
            new_Img.src = profilepath;
       
            
        },
        error: function (xhr) {
            //alert(xhr.responseText);
        }
    }).done(function () {
        hideLoader();
    });
}



function GetProfileDataConnect(userProfileid) {
    //alert(userProfileid);

    var inputdata = {
        "UserID": userProfileid
    };

    $.ajax({
        type: "GET",
    
        //url: "http://localhost:4103/api/User/GetUserData",
        url: "http://174.141.233.6/MY6/api/User/GetUserData",
        data: inputdata,
        success: function (data) {
            console.log(data);
            var FirstName = data.ResponseData[0].FirstName;
           
            var rating = data.ResponseData[0].UserRating;
     
            var LastName = data.ResponseData[0].LastName;
            var Name = FirstName + " " + LastName;
            var Gender = data.ResponseData[0].Gender;
            var DOB = data.ResponseData[0].DOB;
            var LocationAddress = data.ResponseData[0].LocationAddress;
            var interests = data.ResponseData[0].interests;
            var profilepath= data.ResponseData[0].ProfilePicName;
            //  var profilepath = data.ResponseData[i].FacebookProfilePicUrl;
               
              
                if (profilepath == null || profilepath == "") {

                    profilepath = "img/white-logo-2.png";
                }
                
                else
              	  {
              	  
              	  profilepath= "http://174.141.233.6/my6/Files/ProfilePictures/" + data.ResponseData[0].ProfilePicName;
              	  }

              //  $('#rateit5').rateit('value', rating);

            $("#seeName").text(Name);
            $("#seeGender").text(Gender);
            $("#seeLocation").text(LocationAddress);
            $("#seeDOB").text(DOB);
            $("#seeinterest").text(interests);

            var new_Img = document.getElementById("profilepic");
            new_Img.src = profilepath;

        },
        error: function (xhr) {
          //  alert(xhr.responseText);
        }
       });
}



//check if an user is friend to other user
function isFriend() {
    var inputdata = {
        "currentUserID": userId,
        "otherUserID": userProfileid
    };

    $.ajax({
        type: "GET",
        beforeSend: showLoader(),
        //url: "http://localhost:4103/api/User/isFriend",
        url: "http://174.141.233.6/MY6/api/User/isFriend",
        data: inputdata,
        success: function (data) {
            console.log(data);
            console.log(data.ResponseData.length);
            if (data.ResponseData == 1) {
              
                $("#connectButton").hide();
            }
            else
                $("#connectButton").show();
          
        },
        error: function (xhr) {
           // alert(xhr.responseText);
        }
    }).done(function () {
        hideLoader();
    });
}



function connect() {
    var userProfileid = localStorage.getItem("profileId");
   
    var inputdata = {
        "UserID": userId,
        "friendUserID": userProfileid
    };

    $.ajax({
        type: "POST",
        beforeSend: showLoader(),
        //url: "http://localhost:4103/api/User/Connect",
        url: "http://174.141.233.6/MY6/api/User/Connect",
        data: inputdata,
        success: function (data) {
            console.log(data);
            //console.log(data.ResponseData.length);

        },
        error: function (xhr) {
        //    alert(xhr.responseText);
        }
    }).done(function () {
        hideLoader();
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
