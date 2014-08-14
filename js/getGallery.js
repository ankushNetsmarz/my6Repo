
var userProfileid = localStorage.getItem("profileId");
var me = window.localStorage.getItem("me");
var userId = localStorage.getItem("userId");

if (me == "true") {
    userProfileid = userId;
   
}
function GetImageFeeds(startPageImage, endpageImage) {
    localStorage.setItem("startPageImage", startPageImage);
    localStorage.setItem("endpageImage", endpageImage);

    var inputdata = {
        "userID": userProfileid,
        "StartPage": startPageImage,
        "EndPage": endpageImage
    };
    $.ajax({
        type: "GET",
        beforeSend: showLoader(),
        //url: "http://localhost:4103/api/Feed/GetImageFeeds",
        url: "http://174.141.233.6/MY6/api/Feed/GetImageFeeds",
        data: inputdata,
        success: function (data) {
            console.log(data.ResponseData.length);
            var HTML = '';
            window.localStorage.setItem("me", "false");

            if (data.ResponseData.length > 0) {

              
                for (var i = 0; i < data.ResponseData.length; i++) 
                {


                  var path = 'http://174.141.233.6/MY6/' + data.ResponseData[i].RelativePath;
                  
                   HTML+= "<li>"
              
                   HTML += "<div class='gallery-pic'><img src="+path+" onclick='showImage(this.src);'></div>"

                   HTML += "</li>"
                }
                HTML += "<div id='LoadImages' class='load-more'><a href='#'>Load More...</a></div>"
                var carry = localStorage.getItem("carry");
            
                if (carry = "carry") {
                    $("#gallery").append(HTML);
                }
                else {
                    $("#gallery").html(HTML);
                }
            }
            else if (carry = "carry") {
                HTML += "<div style='width: 100%; text-align: center; color: rgba(255, 255, 255, 0.3); padding: 0px; margin: 0px;'>"
                HTML += "<img src='images/noData.png'>"
                HTML += "<div>No more images</div>"
                HTML += "</div>"

                $("#gallery").append(HTML);
            }

            else {
                HTML += "<div style='width: 100%; text-align: center; color: rgba(255, 255, 255, 0.3); padding: 0px; margin: 0px;'>"
                HTML += "<img src='images/noData.png'>"
                HTML += "<div>No Images Found</div>"
                HTML += "</div>"
                $("#gallery").html(HTML);
            }

        },
        error: function (xhr) {
            alert(xhr.responseText);
        }
    }).done(function () {
        hideLoader();
    });
}

//Get Video Feeds
function GetVideoFeeds(startPagevideo, endpagevideo) {
  
    localStorage.setItem("startPagevideo", startPagevideo);
    localStorage.setItem("endpagevideo", endpagevideo);
    var inputdata = {
        "userID": userProfileid,
        "StartPage": startPagevideo,
        "EndPage": endpagevideo
    };
    $.ajax({
        type: "GET",
        beforeSend: showLoader(),
        //url: "http://localhost:4103/api/Feed/GetVideoFeeds",
        url: "http://174.141.233.6/MY6/api/Feed/GetVideoFeeds",
        data: inputdata,
        success: function (data) {
            var HTML = '';
            if (data.ResponseData.length > 0) {
                
                for (var i = 0; i < data.ResponseData.length; i++) {


                    var path = 'http://174.141.233.6/MY6/' + data.ResponseData[i].RelativePath;

                    HTML += "<li>"

                    HTML += "<div class='gallery-pic'>"
                    HTML += "<div class='video ' style='display:block'>"
                    HTML += "<video class='borderClass' width='180' height='100' controls='' src=" + path + ">"
                    HTML += "<source type='video/mp4' src='' id='video'></source></video></div></div>"

                    HTML += "</li>"
                }
                HTML += "<div id='Loadvideo' class='load-more'><a href='#'>Load More...</a></div>"

                var carry = localStorage.getItem("carry1");
               
                if (carry = "carrynovideo") {
                    
                    $("#gallery").append(HTML);
                }


                else {
                    $("#gallery").html(HTML);
                }
            }
            else if (carry = "carrynovideo") {
                HTML += "<div style='width: 100%; text-align: center; color: rgba(255, 255, 255, 0.3); padding: 0px; margin: 0px;'>"
                HTML += "<img src='images/noData.png'>"
                HTML += "<div>No more videos </div>"
                HTML += "</div>"

                $("#gallery").append(HTML);
            }

            else  {
                HTML += "<div style='width: 100%; text-align: center; color: rgba(255, 255, 255, 0.3); padding: 0px; margin: 0px;'>"
                HTML += "<img src='images/noData.png'>"
                HTML += "<div>No videos Found</div>"
                HTML += "</div>"

                $("#gallery").html(HTML);
            }
        },
        error: function (xhr) {
            alert(xhr.responseText);
        }
    }).done(function () {
        hideLoader();
    });
}


$(document).on("click", "#LoadImages", function () {
   
    startPageImage = localStorage.getItem("startPageImage");
    endpageImage = localStorage.getItem("endpageImage");

    localStorage.setItem("carry", "carry");
    $(this).hide();
    startPageImage = parseInt(endpageImage) + 1;
    endpageImage = parseInt(startPageImage) + 5;

    GetImageFeeds(startPageImage, endpageImage);
    localStorage.setItem("startPageImage", startPageImage);
    localStorage.setItem("endpageImage", endpageImage);

});

$(document).on("click", "#Loadvideo", function () {
   
    startPagevideo = localStorage.getItem("startPagevideo");
  endpagevideo = localStorage.getItem("endpagevideo");

  
    //localStorage.setItem("new_start", "");
    $(this).hide();
    startPagevideo = parseInt(endpagevideo) + 1;
    endpagevideo = parseInt(startPagevideo) + 5;
    
    GetVideoFeeds(startPagevideo, endpagevideo);
    localStorage.setItem("startPagevideo", startPagevideo);
    localStorage.setItem("endpagevideo", endpagevideo);
});

function hideLoader() {

    $('#loaderImage').css("display", "none");
    $('.flex').css("display", "none");
}

function showLoader() {

    $('#loaderImage').css("display", "block");
    $('.flex').css("display", "block");

}

function showImage(x)
{
    window.open(x,'_blank','location=no');
}
