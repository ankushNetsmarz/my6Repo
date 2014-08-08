
//Get full conversation between 2 users for a specific feedid
function GetConversation(conversation) {
    var HTML = "";
    var inputdata = {
        "ConversationID": conversation,
      
    };

    $.ajax({
        type: "GET",
        //url: "http://localhost:4103/api/User/GetConversation",
        url: "http://174.141.233.6/MY6/api/User/GetConversation",
        data: inputdata,
        success: function (data) {
            console.log(data);
            //console.log(data.ResponseData.length);
            for (var i = 0; i < data.ResponseData.length; i++) {

                var FirstName = data.ResponseData[i].FirstName;
                var LastName = data.ResponseData[i].LastName;
                var Message = data.ResponseData[i].Message;
                var sentDate = data.ResponseData[i].sentDate;
                var userName = FirstName + " " + LastName;
               var profilepath= data.ResponseData[i].ProfilePicName;
            
                //  var profilepath = data.ResponseData[i].FacebookProfilePicUrl;
                   
                  
                    if (profilepath == null || profilepath == "") {

                        profilepath = "img/white-logo-2.png";
                    }
                    
                    else
                  	  {
                  	  
                  	  profilepath= "http://174.141.233.6/my6/Files/ProfilePictures/" + data.ResponseData[i].ProfilePicName;
              
                  	  }

                var sender = data.ResponseData[i].Sender;



                HTML += "<div class='comment-list-area'>"
                HTML += "<img src=" + profilepath + " class='fl' width='40' height='40'>"

                HTML += "<div class='fl comment-list-text'>"

                HTML += "<span><strong>" + userName + "</strong></span> &nbsp;" + sentDate + "<br>" + Message + "</div> <div class='clr'></div></div>"


                $(".message-area").html(HTML);
                $("#message").show();
            }
        },
        error: function (xhr) {
           // alert(xhr.responseText);
        }
    });
}

