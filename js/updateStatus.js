  //update user's status
var userId = localStorage.getItem("userId");

        function updateUserStatus() {
        	
            var inputdata = {
                "userid": userId,
                "status": $(".profile-status").val() //status of the user
            };

            $.ajax({
                type: "POST",
                //url: "http://localhost:4103/api/User/updateUserStatus",
                url: "http://174.141.233.6/MY6/api/User/updateUserStatus",
                data: inputdata,
                success: function (results) {
                    console.log(results);
                   
                   window.plugins.toast.show('Status Updated !', 'long', 'center', function(a){}, function(b){});
                }
            });

        }