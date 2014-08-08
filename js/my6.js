var namesInterest = [];
var interestResponseNew = [];
var IdInterest = [];
var interestResponseIdNew = [];
var urlPic;
var ResponseArray = [];
var user = {};







//ADD or CREATE
function AddNewUser() {
    var faceBookUrl = localStorage.getItem("facebookUrl");


    var userData = {
        "email": $("#emails").val(),
        "password": $("#UserPassword").val(),
        "firstName": $("#Firsti").val(),
        "lastName": $("#Lasts").val(),
        "isRegisteredByFacebook": true,
        "FacebookPicURL": faceBookUrl

    };


    $.ajax({
        type: "POST",
        beforeSend: showLoader(),
        url: "http://174.141.233.6/MY6/api/user/AddUser",
        data: userData,

        success: function (data) {
            console.log(data);
            var userId = data.ResponseData;
            localStorage.setItem("userId", userId);

            var sucess = data.IsSucess;

            if (sucess == "false") {
                $(".message-area").text("please try again, may be already registered");
                $(".alert-box").show();

            }
            else {
                window.localStorage.setItem("login", "submit");
                window.location.replace("interest.html");
            }
        },
        error: function (xhr) {
            $(".message-area").text(xhr.responseText);
            $(".alert-box").show();

        }
    }).done(function () {
        hideLoader();
    });
}

//update user
function UpdateUser() { 
    var editNameNew = $("#EditName").val().split(" ");
    var gender = localStorage.getItem("gender");
    if (gender == null) {
       
        gender = "Male";
    }
    var userData =
        {
            "userID": localStorage.getItem("userId"),
            "DOB": $("#EditDOB").val(),
            "firstName": editNameNew[0],
            "lastName": editNameNew[1],
            "contactNo": $("#EditContact").val(),
            "Gender": gender,
            "locationAddress": $("#EditLocation").val()
        };
    console.log(userData);
    //alert(userData);
    $.ajax({
        type: "POST",
        beforeSend: showLoader(),
        url: "http://174.141.233.6/MY6/api/user/UpdateUser",
        data: userData,
        success: function (data) {
          toastr.success("profile updated");
           
            GetUserData();
        },
        error: function (xhr) {
         //   alert(xhr.responseText);
        }
    }).done(function () {
        hideLoader();
    });
}

function GetUserData() {

    var inputdata = {
        "UserID": localStorage.getItem("userId")
    };

    $.ajax({
        type: "GET",
        beforeSend: showLoader(),
        //url: "http://localhost:4103/api/User/GetUserData",
        url: "http://174.141.233.6/MY6/api/User/GetUserData",
        data: inputdata,
        success: function (data) {
            console.log(data);
            
            var profilePic= data.ResponseData[0].ProfilePicName;
         
       
            if (profilePic == null || profilePic == "") {

            	profilePic = "img/white-logo-2.png";
              
            }

            else {

            	profilePic = "http://174.141.233.6/my6/Files/ProfilePictures/" + data.ResponseData[0].ProfilePicName;
              
            }
        
           
         
       
          
        
            localStorage.setItem("ProfilePic",profilePic);
            //    alert(data.ResponseData[0].interestsID);
            user.rating = data.ResponseData[0].UserRating;
            user.id = data.ResponseData[0].UserID;
            user.FirstName = data.ResponseData[0].FirstName;
            user.LastName = data.ResponseData[0].LastName;
            user.DOB = data.ResponseData[0].DOB;
            user.ContactNo = data.ResponseData[0].ContactNo;
            user.LocationAddress = data.ResponseData[0].LocationAddress;
            user.Gender = data.ResponseData[0].Gender;
            user.interests = data.ResponseData[0].interests;
            user.status =data.ResponseData[0].Status;
           
            
            var interestResponse = data.ResponseData[0].interests;
            var interestResponseId = data.ResponseData[0].interestsID;
         

            interestResponseNew = interestResponse.split("|");
            interestResponseIdNew = interestResponseId.split("|");
          
            

            for (var i = 0; i < 6; i++) {
                namesInterest.push(interestResponseNew[i]);
                IdInterest.push(interestResponseIdNew[i]);
            }

            localStorage.setItem("interestResponse", JSON.stringify(namesInterest));
            localStorage.setItem("interestResponseId", JSON.stringify(IdInterest));


            
            localStorage.setItem("userId", data.ResponseData[0].UserID);
            localStorage.setItem("ResponseArray", JSON.stringify(user));



        },
        error: function (xhr) {
          //  alert(xhr.responseText);
        }
    }).done(function () {
        hideLoader();
    });
}



//Add interests
function AddInterests() {
    var userIdConnect = localStorage.getItem("userId");
    var Interests = JSON.parse(localStorage.getItem("newId"));


    var inputdata = {

        "UserID": userIdConnect,
        "Interests": Interests + ","
    };

    $.ajax({
        type: "GET",
        // url: "http://localhost:4103/api/user/AddInterest/",
        url: "http://174.141.233.6/MY6/api/user/AddInterest/",
        data: inputdata,
        success: function (data) {
            console.log(data);
            toastr.success("interest added");
        },
        error: function (xhr) {
            $(".message-area").text(xhr.responseText);
            $(".alert-box").show();

        }
    });
}


function IsEmailExists() {
    var userData = {
        "email": $("#emails").val()
    };

    $.ajax({
        type: "GET",
        beforeSend: showLoader(),
        url: "http://174.141.233.6/MY6/api/user/IsEmailExists",
        data: userData,
        success: function (data) {
            console.log(data);
            var res = data.ResponseData;
            if (res == 1) {
                $(".message-area").text("user is already registered");
                $(".alert-box").show();

                $("#emails").val('');
                $("#emails").focus();
            }

        },
        error: function (xhr) {
            $(".message-area").text(xhr.responseText);
            $(".alert-box").show();


        }
    }).done(function () {
        hideLoader();
    });
}

//Validate User
function validateUser() {

    var inputdata = {
        "email": $("#emailLogin").val(),
        "password": $("#passwordLogin").val()
    };
    $.ajax({
        type: "GET",
        beforeSend: showLoader(),
        url: "http://174.141.233.6/MY6/api/user/GetLogin/",
        data: inputdata,
        success: function (data) {
        	if(data.ResponseData[0].UserID != 0)
        		{
        	    createDatabase();

        	  
        	  user.rating = data.ResponseData[0].UserRating;
            user.id = data.ResponseData[0].UserID;
            user.FirstName = data.ResponseData[0].FirstName;
            user.LastName = data.ResponseData[0].LastName;
            user.DOB = data.ResponseData[0].DOB;
            user.ContactNo = data.ResponseData[0].ContactNo;
            user.LocationAddress = data.ResponseData[0].LocationAddress;
            user.Gender = data.ResponseData[0].Gender;
            user.interests = data.ResponseData[0].interests;
            user.status =data.ResponseData[0].Status;
            localStorage.setItem("userId", data.ResponseData[0].UserID);

            localStorage.setItem("ResponseArray", JSON.stringify(user));

            var respons = data.ResponseData[0].UserID;

            var interestResponse = data.ResponseData[0].interests;
            var interestResponseId = data.ResponseData[0].interestsID;

            var facebookUrl = data.ResponseData[0].FacebookProfilePicUrl;
            var ProfilePicUrl = data.ResponseData[0].ProfilePicName;

            if (ProfilePicUrl != null) {
                urlPic = "http://174.141.233.6/my6/Files/ProfilePictures/" + ProfilePicUrl;
            }
         //   else if (facebookUrl != null) {
               // urlPic = facebookUrl;
         //   }
            else {
                urlPic = "img/white-logo-2.png";
            }

            localStorage.setItem("ProfilePic", urlPic);

     
            interestResponseNew = interestResponse.split("|");
            interestResponseIdNew = interestResponseId.split("|");

            for (i = 0; i < 6; i++) {
                namesInterest.push(interestResponseNew[i]);
                IdInterest.push(interestResponseIdNew[i]);
            }

            localStorage.setItem("interestResponse", JSON.stringify(namesInterest));
            localStorage.setItem("interestResponseId", JSON.stringify(IdInterest));



            if (respons == "0") {
                $(".message-area").text("please try again");
                $(".alert-box").show();

            }
            else {
                window.location.replace("interest.html");
            }
        		}
        	else
        		   $(".message-area").text("Please try again!!");
            $(".alert-box").show();
      
        	

        },
        error: function (xhr) {
          //  alert(xhr.responseText);
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
