function validate(){
var ID = document.getElementById("ID").value;
var password = document.getElementById("password").value;
var error_msg = document.querySelector(".error_msg");
var role = -1;
if ( ID == "admin" && password == "admin" ){
    role = 1;
    window.location = "../html/seat.html"; // Redirecting to other page.
    return false;
}
else{
    if ( ID == "staff1" && password == "123456"){
        role = 0;
        window.location = "../html/seat.html"; // Redirecting to other page.
        return false;
    }
    else{
        if(ID != "admin" || ID != "staff1" ){
            error_msg.style.display = "inline-block";
        }
        else{
            if (password != "admin" || password != "123456"){
                error_msg.style.display = "inline-block";
            }
        }
    }
}
}