function validate(){
var ID = document.getElementById("ID").value;
var password = document.getElementById("password").value;
if ( ID == "admin" && password == "admin" ){
    alert ("Login successfully as Admin");
    window.location = "../html/seat.html"; // Redirecting to other page.
    return false;
}
else{
    if ( ID == "staff1" && password == "123456"){
        alert ("Login successfully as Staff 1");
        window.location = "../html/seat.html"; // Redirecting to other page.
        return false;
    }
    else{
        if(ID != "admin" || ID != "staff1" ){
            alert("Wrong ID!");
        }
        else{
            if (password != "admin" || password != "123456"){
                alert("Wrong password");
            }
        }
    }
}

}