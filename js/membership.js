
var listMember = [];

var membershipAPI = "http://localhost:3000/getMembership"

var bodyMainList = document.getElementsByClassName("body__main__list")[0];
var bodyNewMembership = document.getElementsByClassName("body__new__membership")[0];
var bodyManageDiscount = document.getElementsByClassName("body__manage__discount")[0];

function start() {
    getMemberships();
    
}

start();

function getMemberships(){
    fetch(membershipAPI)
    .then(function(response){
        return response.json();
    })
    .then(function(getMembership){
        listMember = getMembership;
        showMemberShip();
    });
}

function getInvalidMessage(message) {
    var invalidMessage = `
                            <img src="../images/info.png" class="invalid__input-icon" alt="">
                            <p>${message}</p>
    `
    return invalidMessage;
}

//show membership
function showMemberShip() {
    bodyMainList.innerHTML = ``;

    for(let i = 0; i < listMember.length; i++) {
        bodyMainList.innerHTML +=   `
                                <div class="body__main__list__item" onclick="openEditMembership(${i})">
                                    <div class="body__main__bar__id">
                                        ${listMember[i].memberID}
                                    </div>
                                    <div class="body__main__bar__name">
                                        <div class="separate">|</div>
                                            ${listMember[i].memberName}
                                        <div class="separate">|</div>
                                    </div>
                                    <div class="body__main__bar__phone">
                                        ${listMember[i].memberPhone}
                                    </div>
                                    <div class="body__main__bar__point">
                                        <div class="separate">|</div>
                                            ${listMember[i].memberPoint}
                                        <div class="separate">|</div>
                                    </div>
                                    <div class="body__main__bar__rank">
                                        ${listMember[i].memberRank}
                                    </div>
                                </div>
    `
    }
}



// add and edit membership information
var member = {}

function openNewMembership() {
    closeNewMembership();
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
                            <div class="new__membership__cancel-btn  btn primary-btn" onclick="closeNewMembership()">
                                Cancel
                            </div>
                        </div>
    `
}

function closeNewMembership() {
    bodyNewMembership.innerHTML = ``;
}

function handleInvalidEffect(validPath, index,message) {
    let invalidBorder = document.getElementsByClassName("new__membership__input-text")[index];
    invalidBorder.classList.add("invalid__input-border");

    let invalidMessage = document.getElementsByClassName(validPath)[0].getElementsByClassName("invalid__input-message")[0];
    invalidMessage.innerHTML = getInvalidMessage(message);
}

function removeInvalidEffect(path, index) {
    let containerInput = document.getElementsByClassName(path)[0];
    let invalidMessage = containerInput.getElementsByClassName("invalid__input-message")[0];
    invalidMessage.innerHTML = ``

    let invalidBorder = document.getElementsByClassName("new__membership__input-text")[index];
    if(invalidBorder.classList.contains("invalid__input-border")) {
        invalidBorder.classList.remove("invalid__input-border")
    }
}

function handleGetInputName(validPath, index, value) {
    if(value) {
        member.memberName = value;
    } else {
        handleInvalidEffect(validPath, index, 'Enter a name!');
    }
}

function handleGetInputPhone(validPath, index, value) {
    if(value) {
        if(isNaN(value)) {
            handleInvalidEffect(validPath, index, 'Phone must be number!');
        } else {
            member.memberPhone = value;
        }
    } else {
        handleInvalidEffect(validPath, index, 'Enter a phone number!');
    }
}

function handleAddMembership() {
    let isValid = true;
    if(!member.memberName) {
        handleInvalidEffect('new__membership__input__name', 0, 'Enter a name!');
        isValid = false;
    }
    
    if(!member.memberPhone) {
        handleInvalidEffect('new__membership__input__phone', 1, 'Enter a phone number!');
        isValid = false;
    }

    if(!isValid) {
        return;
    }

    member.memberID = listMember[listMember.length-1].memberID+1;
    member.memberPoint = 1000;
    member.memberRank = "Bronze";

    listMember.push(member);
    member = {};

    closeNewMembership();
    showMemberShip();
}

// edit membership information 
function openEditMembership(index) {
    closeNewMembership();
    handleGetInputName('new__membership__input__name', 0, listMember[index].memberName);
    handleGetInputPhone('new__membership__input__phone', 1, listMember[index].memberPhone);
    bodyNewMembership.innerHTML = `
                        <div class="body__new__membership__input">
                            <div class="new__membership__input__name">
                                <span>Name</span>
                                <input type="text" value="${listMember[index].memberName}" class="new__membership__input-text" onfocus="removeInvalidEffect('new__membership__input__name', 0)" onblur="handleGetInputName('new__membership__input__name', 0, value)">
                                <div class="invalid__input-message">
                                </div>    
                            </div>
                            <div class="new__membership__input__phone">
                                <span>Phone</span>
                                <input type="text" value="${listMember[index].memberPhone}" class="new__membership__input-text" onfocus="removeInvalidEffect('new__membership__input__phone', 1)" onblur="handleGetInputPhone('new__membership__input__phone', 1, value)">
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
                            <div class="new__membership__cancel-btn  btn primary-btn" onclick="closeNewMembership()">
                                Cancel
                            </div>
                        </div>
    `
}


function handleEditMembership(index) {
    let isValid = true;
    if(!member.memberName) {
        handleInvalidEffect('new__membership__input__name', 0, 'Enter a name!');
        isValid = false;
    }
    
    if(!member.memberPhone) {
        handleInvalidEffect('new__membership__input__phone', 1, 'Enter a phone number!');
        isValid = false;
    }

    if(!isValid) {
        return;
    }

    listMember[index].memberName = member.memberName;
    listMember[index].memberPhone = member.memberPhone;

    member = {};

    closeNewMembership();
    showMemberShip();
}


function handleDeleteMembership(index) {
    listMember.splice(index, 1);
    closeNewMembership();
    showMemberShip();
}

// manage discount

function openManageDiscount() {
    bodyManageDiscount.innerHTML =  `
                                    <div class="body__manage__discount__input">
                                        <div class="body__manage__discount__bronze">
                                            <span>Bronze</span>
                                            <input type="text" class="manage__discount__input-text">
                                        </div>
                                        <div class="body__manage__discount__silver">
                                            <span>Silver</span>
                                            <input type="text" class="manage__discount__input-text">
                                        </div>
                                        <div class="body__manage__discount__gold">
                                            <span>Gold</span>
                                            <input type="text" class="manage__discount__input-text">
                                        </div>
                                        <div class="body__manage__discount__diamond">
                                            <span>Diamond</span>
                                            <input type="text" class="manage__discount__input-text">
                                        </div>
                                    </div>
                                    <div class="body__manage__discount__btn">
                                        <div class="body__manage__discount__apply btn primary-btn">
                                            Apply
                                        </div>
                                        <div class="body__manage__discount__cancel btn primary-btn" onclick="closeManageDiscount()">
                                            Cancel
                                        </div>
                                    </div>
    `
}

function closeManageDiscount() {
    bodyManageDiscount.innerHTML =  ``;
}