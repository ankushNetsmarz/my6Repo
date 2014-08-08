//var ResponseArrayNewsFeed = [];
//var userfeed = {};
//var startPage = 1;
//var endpage = 10;
//Get All Feeds

var idUserId = localStorage.getItem("userId");

function GetFeeds(startPage, endpage) {

    localStorage.setItem("startPage", startPage);
    localStorage.setItem("endpage", endpage);
    var id = localStorage.getItem("interestId");
    
    if (id == "null" || id == null) {
        id = "";
    }

   

    var HTML = "";
    var inputdata = {
        "userID": idUserId,
        "interestID": id,
        "StartPage": startPage,
        "EndPage": endpage

    };
    $.ajax({
        type: "GET",
        beforeSend: showLoader(),
        //url: "http://localhost:4103/api/Feed/GetFeeds",
        url: "http://174.141.233.6/MY6/api/Feed/GetFeeds",
        data: inputdata,
        success: function (data) {

            if (data.ResponseData.length > 0) {
                for (var i = 0; i < data.ResponseData.length; i++) {

                    feedId = data.ResponseData[i].FeedID;

                    var path = 'http://174.141.233.6/MY6/' + data.ResponseData[i].RelativePath;
                    var new_path = path.substring(path.lastIndexOf('.'));
                    var details = "images/right.png";

                    profilepath = data.ResponseData[i].ProfilePicName;
                    //  var profilepath = data.ResponseData[i].FacebookProfilePicUrl;


                    if (profilepath == null || profilepath == "") {

                        profilepath = "img/white-logo-2.png";
                    }

                    else {

                        profilepath = "http://174.141.233.6/my6/Files/ProfilePictures/" + data.ResponseData[i].ProfilePicName;
                    }
                    //   else {

                    //    profilepath = (profilepath.substring(0, profilepath.lastIndexOf('=')) + "=square");
                    //  }

                    var sender = data.ResponseData[i].FirstName + " " + data.ResponseData[i].LastName;
                    var UserID = data.ResponseData[i].UserID;

                    var title = JSON.stringify(data.ResponseData[i].FeedTitle)
                    var Description = JSON.stringify(data.ResponseData[i].FeedDescription)
                    var price = data.ResponseData[i].Price;
                    var location = data.ResponseData[i].Location;
                    var feedType = data.ResponseData[i].FeedType;
                    if (location == "") {
                        location = "null";
                    }


                    HTML += "<div class='single-news'>"
                    HTML += "<div class='news-sender'>"
                    HTML += "<div class='news-pro-pc'><img src=" + profilepath + "></div>"

                    HTML += "<div class='sender-name'>"
                    HTML += "<h4>" + data.ResponseData[i].FirstName + " " + data.ResponseData[i].LastName;

                    HTML += "<h4 class='location'>near " + data.ResponseData[i].Location + "</h4></div>"
                    HTML += "<div class='clr'></div> </div>"

                    HTML += "<div class='posted-pic' style='z-index:2;'>"
                    if (feedType == "1") {
                        HTML += "<img class='imageUploaded borderClass' src=" + path + " ></div>"
                    }

                    else {
                        HTML += "<div class='video ' style='display:block;z-index:0'>"
                        HTML += "<video class='borderClass' width='180' height='100' controls='' src=" + path + ">"
                        HTML += "<source type='video/mp4' src='' id='video'></source></video></div></div>"
                    }
                    HTML += "<p><b>" + data.ResponseData[i].FeedTitle + "</b></p>"
                    HTML += "<p>" + data.ResponseData[i].FeedDescription + "</p>"
                    HTML += "<p>" + data.ResponseData[i].Remarks + "</p>"
                    HTML += "<div class='click' style='background: none repeat scroll 0% 0% rgb(255, 255, 255); width: 100%; margin: 0px;' price=" + price + " location=" + location + " UserID=" + UserID + " path=" + path + " profile=" + profilepath + " Description=" + Description + " title=" + title + " feedId=" + data.ResponseData[i].FeedID + " name=" + data.ResponseData[i].FirstName + "&nbsp;" + data.ResponseData[i].LastName + ">"
                    HTML += "<div class='like-btn'>" + data.ResponseData[i].TotalLikes + " Applauses </div>"
                    HTML += "<div class='comment-btn'>" + data.ResponseData[i].TotalComments + " Comments </div>"
                    HTML += "<div class='fr' style='margin:7px 5px 0;'><img src=" + details + "></div>"
                    HTML += "<div class='dollar-sign'> $" + price + "</div>"
                    HTML += "<div class='clr'></div></div></div>"

                }
                HTML += "<div class='need-acntLoad'><input id='load' style='color:black;' type='button' value='Load more feeds....'></div>"
                var newstrt = localStorage.getItem("new_start");

                if (newstrt == "new_start") {

                    $(".news-list").html(HTML);
                } else {
                    $(".news-list").append(HTML);
                }
            }



            else {
              HTML+="<div style='width: 100%; text-align: center; color: rgba(255, 255, 255, 0.3); padding: 0px; margin: 0px;'>"
              HTML+="<img src='images/noData.png'>"
              HTML+="<div>No Data Found</div>"
              HTML+="</div>"
              $(".news-list").html(HTML);
            }


            $(".imageUploaded").each(function () {
                var new_path = $(this).prop('src');
                new_path = new_path.substring(new_path.lastIndexOf('.'));              
                var w = $(this).width();
                if (w > 200) {
                    $(this).width("90%");

                }

            });

            $(".location").each(function () {

                var location = $(this).text();

                if (location == "near ") {
                    $(this).hide();
                }


            });

            $(".dollar-sign").each(function () {

                var dollar = $(this).text();
                if (dollar == " $0") {
                    $(this).hide();
                }


            });

        },
        error: function (xhr) {
            //alert(xhr.responseText);
        }
    }).done(function () {
        hideLoader();
    });
}


    


$(document).on("click", "#load", function () {
    startPage = localStorage.getItem("startPage");
    endpage = localStorage.getItem("endpage");

    localStorage.setItem("new_start", "");
    $(this).hide();
    startPage = parseInt(endpage) + 1;
    endpage = parseInt(startPage) + 9;

    GetFeeds(startPage, endpage);
    localStorage.setItem("startPage", startPage);
    localStorage.setItem("endpage", endpage);

});

$(document).on("click", ".click", function () {

    var userIdFeed = $(this).attr('UserID');
    localStorage.setItem("userIdFeed", userIdFeed);

    var feedId = $(this).attr('feedId');
    localStorage.setItem("feedId", feedId);
    var paths = $(this).attr('path');
    localStorage.setItem("pathImage", paths);

    var sender = $(this).attr('name');
    var photo = $(this).attr('profile');

    var title = $(this).attr('title');
    var price = $(this).attr('price');
    var location = $(this).attr('location');

    var description = $(this).attr('Description');

    localStorage.setItem("price", price);
    localStorage.setItem("location", location);
    localStorage.setItem("title", title);
    localStorage.setItem("description", description);

    localStorage.setItem("senderName", sender);
    localStorage.setItem("profilePhoto", photo);
    localStorage.setItem("login", "login");
    window.location.replace("content.html");

});





function AddFeed(imageURL) {
    var imageURL = imageURL;
    var userid = localStorage.getItem("userId");
    var title = $("#Title").val();
    var description = $("#Description").val();
    var forsale = localStorage.getItem("status");
    var Price = $("#Price").val();
    if (Price == "") {
        Price = parseInt("0");

    }
    var remarks = $("#Remarks").val();
    var city = $("#location").val();
    var interestSelected = localStorage.getItem("interestSelected");


    var inputdata = {
        "fileInBase64Format": imageURL,
        "userid": userid,
        "feedType": parseInt("1"), //1 for image or 2 for video
        "description": description,
        "title": title,
        "forsale": forsale,
        "price": Price,
        "remarks": remarks,
        "location": city, //lat,long
        "interests": interestSelected, //Interest Ids in which the current feed falls
        "extension": ".png" //exension of the feed
    };

    $.ajax({
        type: "POST",
        beforeSend: showLoader(),
        url: "http://174.141.233.6/MY6/api/Feed/addFeed",
        data: inputdata,
        success: function (results) {
            console.log(results);
            toastr.success("feed added");

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
