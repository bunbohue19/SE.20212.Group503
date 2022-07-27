
var listMember = [];

var GETcustomerAPI = "http://localhost:8081/customer/active"
var POSTcustomerAPI = "http://localhost:8081/customer"
var PUTcustomerAPI = "http://localhost:8081/customer"
var DELETEcustomerAPI = "http://localhost:8081/customer"

var bodyMainList = document.getElementsByClassName("body__main__list")[0];
var bodyNewMembership = document.getElementsByClassName("body__new__membership")[0];
var bodyManageRate = document.getElementsByClassName("body__manage__rate")[0];


var role = parseInt(localStorage.getItem('role'));

function start() {
    getMemberships();
    setRole();
}

start();

function getMemberships(){
    fetch(GETcustomerAPI)
    .then(function(response){
        return response.json();
    })
    .then(function(getMembership){
        listMember = getMembership;
        showMemberShip();
    });
}

function setRole() {
    var navRole = document.getElementsByClassName("nav__role")[0];
    if(role == 1) {
        navRole.innerHTML = `
                            <div class="nav__role__img">
                                <a href="#">
                                    <img src="../images/manager.png" alt="thenf">
                                </a>
                            </div>
                            <p class="nav__manager__text">
                                Manager
                            </p>
        `
    } else if(role == 0) {
        navRole.innerHTML = `
                        <div class="nav__role__img">
                            <a href="#">
                                <img src="../images/staff.png" alt="thenf">
                            </a>
                        </div>
                        <p class="nav__staff__text">
                            Staff
                        </p>
    `
    }
}

//show membership
function showMemberShip() {
    bodyMainList.innerHTML = ``;

    for(let i = 0; i < listMember.length; i++) {
        bodyMainList.innerHTML +=   `
                                <div class="body__main__list__item" onclick="openEditMembership(${i})">
                                    <div class="body__main__bar__id">
                                        ${listMember[i].customerId}
                                    </div>
                                    <div class="body__main__bar__name">
                                        <div class="separate">|</div>
                                            ${listMember[i].customerName}
                                        <div class="separate">|</div>
                                    </div>
                                    <div class="body__main__bar__phone">
                                        ${listMember[i].phone}
                                    </div>
                                    <div class="body__main__bar__point">
                                        <div class="separate">|</div>
                                            ${listMember[i].usablePoint}
                                        <div class="separate">|</div>
                                    </div>
                                    <div class="body__main__bar__rank">
                                        ${listMember[i].rank}
                                    </div>
                                    <div class="body__main__bar__purchased">
                                        <div class="separate">|</div>
                                        ${listMember[i].rankPoint}
                                        <div class="separate"></div>
                                    </div>
                                </div>
    `
    }
}



// add and edit membership information
var member = {}

window.openNewMembershipBtn = function() {
    closeNewMembershipBtn();
    bodyNewMembership.innerHTML = `
                        <div class="body__new__membership__input">
                            <div class="new__membership__input__name">
                                <span>Name</span>
                                <input type="text" class="new__membership__input-text" onfocus="removeInvalidEffect('new__membership__input__name', 0)" onblur="handleGetInputName('new__membership__input__name', 0, value)">
                                <div class="invalid__input-message">
                                </div>
                            </div>
                            <div class="new__membership__input__phone">
                                <span>Phone</span>
                                <input type="text" class="new__membership__input-text" onfocus="removeInvalidEffect('new__membership__input__phone', 1)" onblur="handleGetInputPhone('new__membership__input__phone', 1, value)">
                                <div class="invalid__input-message">
                                </div>  
                            </div>
                        </div>
                        <div class="body__new__membership__btn">
                            <div class="new__membership__add-btn  btn primary-btn" onclick="handleAddMembership()">
                                Add
                            </div>
                            <div class="new__membership__cancel-btn  btn primary-btn" onclick="closeNewMembershipBtn()">
                                Cancel
                            </div>
                        </div>
    `
}

window.closeNewMembershipBtn = function() {
    bodyNewMembership.innerHTML = ``;
}

window.getInvalidMessage = function(message) {
    var invalidMessage = `
                            <img src="../images/info.png" class="invalid__input-icon" alt="">
                            <p>${message}</p>
    `
    return invalidMessage;
}

window.handleInvalidEffect = function(validPath, index, message) {
    let invalidBorder = document.getElementsByClassName("new__membership__input-text")[index];
    invalidBorder.classList.add("invalid__input-border");

    let invalidMessage = document.getElementsByClassName(validPath)[0].getElementsByClassName("invalid__input-message")[0];
    invalidMessage.innerHTML = getInvalidMessage(message);
}

window.removeInvalidEffect = function(path, index) {
    let containerInput = document.getElementsByClassName(path)[0];
    let invalidMessage = containerInput.getElementsByClassName("invalid__input-message")[0];
    invalidMessage.innerHTML = ``

    let invalidBorder = document.getElementsByClassName("new__membership__input-text")[index];
    if(invalidBorder.classList.contains("invalid__input-border")) {
        invalidBorder.classList.remove("invalid__input-border")
    }
}

window.handleGetInputName = function(validPath, index, value) {
    if(value) {
        member.customerName = value;
    } else {
        handleInvalidEffect(validPath, index, 'Enter a name!');
    }
}

window.handleGetInputPhone = function(validPath, index, value) {
    if(value) {
        if(isNaN(value)) {
            handleInvalidEffect(validPath, index, 'Phone must be number!');
        } else {
            var isUnique = true;
            for(let i = 0; i < listMember.length; i++) {
                if(listMember[i].phone == value) {
                    isUnique = false;
                }
            }
            if(isUnique) {
                member.phone = value;
            } else {
                handleInvalidEffect(validPath, index, 'Phone number has already been registered!');
            }
        }
    } else {
        handleInvalidEffect(validPath, index, 'Enter a phone number!');
    }
}

window.handleAddMembership = function() {
    let isValid = true;
    if(!member.customerName) {
        handleInvalidEffect('new__membership__input__name', 0, 'Enter a name!');
        isValid = false;
    }
    
    if(!member.phone) {
        handleInvalidEffect('new__membership__input__phone', 1, 'Enter a phone number!');
        isValid = false;
    }

    if(!isValid) {
        return;
    }

    member.customerId = listMember[listMember.length-1].customerId+1;
    member.rankPoint = 0;
    member.usablePoint = 0;
    member.rank = "Bronze";

    
    //post to backend
    var options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(member)
    };
    fetch(POSTcustomerAPI, options) 
        .then(function(response) {
            response.json();
        })
        .then(function() {
            listMember = {};
            member = {};
            closeNewMembershipBtn();
            getMemberships();
        });
}

// edit membership information 
window.openEditMembership = function(index) {
    closeNewMembershipBtn();
    bodyNewMembership.innerHTML = `
                        <div class="body__new__membership__input">
                            <div class="new__membership__input__name">
                                <span>Name</span>
                                <input type="text" value="${listMember[index].customerName}" class="new__membership__input-text" onfocus="removeInvalidEffect('new__membership__input__name', 0)" onblur="handleGetInputName('new__membership__input__name', 0, value)">
                                <div class="invalid__input-message">
                                </div>    
                            </div>
                            <div class="new__membership__input__phone">
                                <span>Phone</span>
                                <input type="text" value="${listMember[index].phone}" class="new__membership__input-text" onfocus="removeInvalidEffect('new__membership__input__phone', 1)" onblur="handleGetInputPhone('new__membership__input__phone', 1, value)">
                                <div class="invalid__input-message">
                                </div>  
                            </div>
                        </div>
                        <div class="body__new__membership__btn">
                            <div class="new__membership__add-btn  btn primary-btn" onclick="handleEditMembership(${index})">
                                Apply
                            </div>
                            <div class="new__membership__add-btn  btn primary-btn" onclick="handleDeleteMembership(${index})">
                                Delete
                            </div>
                            <div class="new__membership__cancel-btn  btn primary-btn" onclick="closeNewMembershipBtn()">
                                Cancel
                            </div>
                        </div>
    `
    member.customerName = listMember[index].customerName;
    member.phone = listMember[index].phone;
}


window.handleEditMembership = function(index) {
    let isValid = true;
    if(!member.customerName) {
        handleInvalidEffect('new__membership__input__name', 0, 'Enter a name!');
        isValid = false;
    }
    
    if(!member.phone) {
        handleInvalidEffect('new__membership__input__phone', 1, 'Enter a phone number!');
        isValid = false;
    }

    if(!isValid) {
        return;
    }

    member.customerId = listMember[index].customerId;
    member.rankPoint = listMember[index].rankPoint;
    member.rank = listMember[index].rank;
    member.usablePoint = listMember[index].usablePoint;

    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(member)
    };
    fetch(PUTcustomerAPI, options) 
        .then(function(response) {
            response.json();
        })
        .then(function() {
            listMember = {};
            member = {};
            closeNewMembershipBtn();
            getMemberships();
        });
}


window.handleDeleteMembership = function(index) {
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(listMember[index])
    };
    fetch(DELETEcustomerAPI, options) 
        .then(function(response) {
            response.json();
        })
        .then(function() {
            listMember = {};
            member = {};
            closeNewMembershipBtn();
            getMemberships();
        });
}

// manage discount

/*
function openManageRate() {
    bodyManageRate.innerHTML =  `
                                    <div class="body__manage__rate__input">
                                        <div class="body__manage__rate__bronze">
                                            <span>Bronze</span>
                                            <input type="text" class="manage__rate__input-text">
                                        </div>
                                        <div class="body__manage__rate__silver">
                                            <span>Silver</span>
                                            <input type="text" class="manage__rate__input-text">
                                        </div>
                                        <div class="body__manage__rate__gold">
                                            <span>Gold</span>
                                            <input type="text" class="manage__rate__input-text">
                                        </div>
                                        <div class="body__manage__rate__diamond">
                                            <span>Diamond</span>
                                            <input type="text" class="manage__rate__input-text">
                                        </div>
                                    </div>
                                    <div class="body__manage__rate__btn">
                                        <div class="body__manage__rate__apply btn primary-btn">
                                            Apply
                                        </div>
                                        <div class="body__manage__rate__cancel btn primary-btn" onclick="closeManageRate()">
                                            Cancel
                                        </div>
                                    </div>
    `
}

function closeManageRate() {
    bodyManageRate.innerHTML =  ``;
}

*/