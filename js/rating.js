

function AddUserRating(userfeedId, rateValue, userId)
{

 
    var userData = {
        userID: userfeedId,
        rating: rateValue,
        ratedBy: userId
    };
    $.ajax({
        type: "POST",
        beforeSend: showLoader(),
        //url: "http://localhost:4103/api/user/updateUserRating",
        url: "http://174.141.233.6/MY6/api/user/updateUserRating",
        data: userData,
        success: function (data) {
          
            toastr.success("Rated");
            //alert("success..." + data);
        },
        error: function (xhr) {
          
            alert(xhr.responseText);
        }


    }).done(function () {
        hideLoader();
    });
}

function GetProfileDataForRating(userfeedId) {

    var inputdata = {
        "UserID": userfeedId
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

            $('#rateit5').rateit('value', rating);
          
        },
        error: function (xhr) {
            //alert(xhr.responseText);
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
