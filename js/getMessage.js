var id = localStorage.getItem("userId")

function GetMessage() {
    var HTML = "";
    var inputdata = {
        "UserID": id
    };

    $.ajax({
        type: "GET",
        beforeSend: showLoader(),
        //url: "http://localhost:4103/api/User/GetMessage",
        url: "http://174.141.233.6/MY6/api/User/GetMessage",
        data: inputdata,
        success: function (data) {
            console.log(data);
            console.log(data.ResponseData.length);
            if(data.ResponseData.length > 0)
            {
                for (var i = 0; i < data.ResponseData.length; i++) {
                    var profilepath = " ";
                    var FirstName = data.ResponseData[i].FirstName;
                    var LastName = data.ResponseData[i].LastName;
                    var Message = data.ResponseData[i].Message;
                    var sentDate = data.ResponseData[i].sentDate;
                    var userName = FirstName + " " + LastName;
                    var feedid = data.ResponseData[i].FeedID;
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
                
             
                    HTML += "<div class='comment-list-area getConversation' conversationid=" + data.ResponseData[i].conversationid + " feedid=" + feedid + " sender=" + sender + " Reciever=" + data.ResponseData[i].Reciever + ">"
                    HTML += "<img src= " + profilepath + " class='fl' width='40' height='40'>"

                    HTML += "<div class='fl comment-list-text'>"

                    HTML += "<span><strong>" + userName + "</strong></span> &nbsp;" + sentDate + "<br>" + Message + "</div> <div class='clr'></div></div>"


                    $(".message-area").html(HTML);
                }
            }
          
            else
            {
                HTML+="<div style='width: 100%; text-align: center; color: rgba(255, 255, 255, 0.3); padding: 0px; margin: 0px;'>"
                HTML+="<img src='images/noData.png'>"
                HTML+="<div>No Data Found</div>"
                HTML+="</div>"
                $(".message-area").html(HTML);
            }
            	
        
                  	

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
