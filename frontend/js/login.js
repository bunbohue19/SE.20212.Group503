var role = 1;
window.validate = function() {
    var ID = document.getElementById("ID").value;
    var password = document.getElementById("password").value;
    var error_msg = document.querySelector(".error_msg");

    if ( ID == "admin" && password == "admin" ){
        role = 1;
        window.location = "../html/seat.html"; // Redirecting to other page.
        return false;
    }
    else{
        if ( ID == "staff" && password == "staff"){
            role = 0;
            window.location = "../html/seat.html"; // Redirecting to other page.
            return false;
        }
        else{
            if(ID != "admin" || ID != "staff" ){
                error_msg.style.display = "inline-block";
            }
            else{
                if (password != "admin" || password != "staff"){
                    error_msg.style.display = "inline-block";
                }
            }
        }
    }
}

export function getRole() {
    return role;
}