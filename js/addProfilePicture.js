var userId = localStorage.getItem("userId");

function AddProfilePicture(imageURL) {

    var inputdata = {
        "fileInBase64Format": imageURL,
        "userid": userId,
        "extension": "png" //exension of the feed
    };

    $.ajax({
        type: "POST",
        //url: "http://localhost:4103/api/User/addProfilePicture",
        url: "http://174.141.233.6/MY6/api/User/addProfilePicture",
        //contentType: false,
        //processData: false,
        data: inputdata,
        success: function (results) {
            console.log(results);
         
        }
    });
}