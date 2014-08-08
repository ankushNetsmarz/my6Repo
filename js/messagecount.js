//Get unread message count

var id = localStorage.getItem("userId");

function getUnreadMessageCount() {
    var inputdata = {
        "userID": id
    };

    $.ajax({
        type: "GET",
      
        url: "http://174.141.233.6/MY6/api/User/getUnreadMessageCount",
        data: inputdata,
        success: function (data) {
        
            console.log(data.ResponseData);
            var length = data.ResponseData;

            var html = "<span id='messageCount1' style='position: absolute;color: green; font-size: 13px; top: 50px;left:40px;text-align: right;z-index:10000'>" + length + " new messages </span>"
            $("#left-flyout-nav").append(html);
            console.log($("#messageCount1").length);




        },
        error: function (xhr) {
           // alert(xhr.responseText);
        }
    });
}
