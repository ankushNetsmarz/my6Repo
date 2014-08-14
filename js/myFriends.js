var userId = localStorage.getItem("userId");

function getFriends() {
    var HTML = "";
    var inputdata = {
        "UserID": userId
    };

    $.ajax({
        type: "GET",
        beforeSend: showLoader(),
        //url: "http://localhost:4103/api/User/getFriends",
        url: "http://174.141.233.6/MY6/api/User/getFriends",
        data: inputdata,
        success: function (data) {
            console.log(data);
            for (i = 0; i < data.ResponseData.length; i++) {
                var friendId = data.ResponseData[i].FriendUserID;
           
                var name = data.ResponseData[i].FirstName;
                var profilepath= data.ResponseData[i].ProfilePicName;
                //  var profilepath = data.ResponseData[i].FacebookProfilePicUrl;
                   
                  
                    if (profilepath == null || profilepath == "") {

                        profilepath = "img/white-logo-2.png";
                    }
                    
                    else
                  	  {
                  	  
                  	  profilepath= "http://174.141.233.6/my6/Files/ProfilePictures/" + data.ResponseData[i].ProfilePicName;
                  	  }

                HTML += "<li>"
                HTML += "<div  userId=" +friendId + " class='connect-pic'>"
                HTML += "<img src=" + profilepath + ">"
                HTML += "</div>"
                HTML += "<h4>" + name + "</h4>"
                HTML += "</li>"

                $("#myfriends").html(HTML);
            }
        },
        error: function (xhr) {
           // alert(xhr.responseText);
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
$(document).on("click", ".connect-pic", function () {
    var profile= $(this).attr('userId');
    localStorage.setItem("profileId", profile);

    var pathName = $(location).attr('href').substring($(location).attr('href').lastIndexOf('/') + 1);
    window.localStorage.setItem("pathName", pathName);
    window.location.replace("userProfile.html");
});