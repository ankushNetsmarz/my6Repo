var flagLike = 0;
function isFeedLiked(feedId, userfeedId) {
   
    var inputdata = {
        "FeedID": feedId,
        "UserID": userfeedId
    };

    $.ajax({
        type: "GET",
        //url: "http://localhost:4103/api/Feed/isFeedLiked",
        url: "http://174.141.233.6/MY6/api/Feed/isFeedLiked",
        data: inputdata,
        success: function (results) {
            var results= results.ResponseData;
            if (results == 1) {
                $(".applause-click-btn").removeClass('applause-click-btn').addClass('applaused-click-btn');
                $(".like-click-btn").removeClass('like-click-btn').addClass('liked-click-btn');
                flaglike = 1;
            }
            else {
                flaglike = 0;
              
            }
        }
    });

}
