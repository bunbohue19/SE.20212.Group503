
// event-infor-popup
var listEvent = [];
var listDish = [];


var showEventAPI = "http://localhost:3000/showEvent";
var getDishAPI = "http://localhost:3000/getDish";
var newEventAPI = "http://localhost:3000/showEvent";

const  eventItemList = document.getElementsByClassName("body__event__list")[0]
const eventItems = document.getElementsByClassName("body__event__item")
const inforPopup = document.getElementsByClassName("body__event__popup")[0]
const newEventForm = document.querySelector(".body__newEvent")

var newEvent = 
{
    "eventName": null,
    "description": null,
    "beginTime": null,
    "endTime": null,
    "discount": []
}

function start(){
    getEvents();
    getDishes();
}

start();

function getEvents(){
    fetch(showEventAPI)
    .then(function(response){
        return response.json();
    })
    .then(function(showEvent){
        listEvent = showEvent;
        handleShowEvent();
    });
}

function getDishes(){
    fetch(getDishAPI)
    .then(function(response){
        return response.json();
    })
    .then(function(getDish){
        listDish = getDish;
    });
}



//show event handler
function handleShowEvent(){
    for(let event of listEvent){
            eventItemList.innerHTML +=  ` 
                                        <div class="body__event__item" onclick="showEventInfor(${event.id})">
                                            <a href="#" class="body__event__item__icon">
                                                <img src="../images/eventsMedia1.png" alt="">
                                            </a>
                                            <p class="body__event__item__title">
                                                ${event.eventName}
                                            </p>
                                        </div>
                                        `
    }
    eventItemList.innerHTML +=  ` 
                                <div class="body__newEvent__btn" onclick="openNewEventBtn(${-1})">
                                    <a href="#" class="body__newEvent__btn__icon">
                                        <img src="../images/plus.png" alt="">
                                    </a>
                                </div>
                                `
}

function showEventInfor(id){
    inforPopup.style.display = 'block'
    for(let i = 0; i < listEvent.length; i++){
        if(listEvent[i].id == id){
            //left
            eventInfor = document.getElementsByClassName("event__popup__infor")
            eventInfor[0].innerHTML = listEvent[i].eventName
            eventInfor[1].innerHTML = listEvent[i].description
            eventInfor[2].innerHTML = new Date(listEvent[i].beginTime).toLocaleString()
            eventInfor[3].innerHTML = new Date(listEvent[i].endTime).toLocaleString()
            
            //right
            dishInfor = document.getElementsByClassName("body__event__popup__right")[0];
            dishInfor.innerHTML =   `
                                    <div class="event__popup__sale">
                                        Discount
                                    </div>
                                    `
            for(discountDish of listEvent[i].discount){
                dishInfor.innerHTML +=   `
                                            <div class="event__popup__right__item">
                                                <div class="event__popup__right__item__img">
                                                    <img src="../images/food-1.png" alt="">
                                                </div>
                                                <span class="event__popup__right__item__name">
                                                    ${discountDish.dishName}
                                                </span>
                                                <span class="event__popup__right__item__discount">
                                                    -${discountDish.discount} %
                                                </span>
                                                <!-- <div class="event__popup__item__close">
                                                    <img src="../images/close.png" alt="">
                                                </div> -->
                                            </div>
                                        `
            }
            eventInforBtn = document.getElementsByClassName("event__popup__btn")[0];
            eventInforBtn.innerHTML =   `
                                        <div class="event__popup__delete-btn" onclick="handleDeleteEvent(${listEvent[i].id})">
                                            <a href="#" class="btn primary-btn">Delete</a> 
                                        </div>
                                        <div class="event__popup__edit-btn" onclick="handleEditEvent(${i})">
                                            <a href="#" class="btn primary-btn">Edit</a> 
                                        </div>
                                        <div class="event__popup__done-btn" onclick="closeInforPopupBtn()">
                                            <a href="#" class="btn primary-btn">Done</a> 
                                        </div>
                                        `
        }
    }
}

function handleEditEvent(index) {
    closeInforPopupBtn();
    
    openNewEventBtn(index);
    //set value infor
    document.getElementsByClassName("newEvent__input-text")[0].value = listEvent[index].eventName;
    document.getElementsByClassName("newEvent__input-text")[1].value = listEvent[index].description;
    document.getElementsByClassName("newEvent__input-text")[2].value = new Date(listEvent[index].beginTime).toISOString().slice(0, 16);
    document.getElementsByClassName("newEvent__input-text")[3].value = new Date(listEvent[index].endTime).toISOString().slice(0, 16);
}

function closeInforPopupBtn() {
    inforPopup.style.display = 'none'
}

function handleDeleteEvent(id){
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
          },
    };
    fetch(showEventAPI + '/' + id, options) 
        .then(function(response) {
            response.json();
        })
        .then(function() {
            getEvents();
        });
}





//new Event handler
function setNewEventValue(name, description, beginTime, endTime) {
    newEventForm.innerHTML = `
                                <h2>New Event</h2>
                                <div class="body__newEvent__container">
                                    <div class="body__newEvent__left">
                                        <ul>
                                            <li class="newEvent__name">
                                                <span>Name</span>
                                                <input type="text" value=${name} class="newEvent__input-text" onblur="handleGetInputName(value)">
                                            </li>
                                            <li class="newEvent__description">
                                                <span>Description</span>
                                                <input type="text" value="${description}" class="newEvent__input-text" onblur="handleGetInputDescription(value)">
                                            </li>
                                            <div class="newEvent__poster-upload">
                                                <span>Poster</span>
                                                <label for="fileImage" class=" btn primary-btn newEvent__poster-upload-label">Upload</label>
                                                <input type="file" th:name="files" id="fileImage" accept="image/png, image/jpeg" required style='display:none' >
                                            </div>
                                            <li class="newEvent__begin-time">
                                                <span>Start time</span>
                                                <input type="datetime-local" value="${beginTime}" class="newEvent__input-text" onblur="handleGetInputBeginTime(value)">
                                            </li>
                                            <li class="newEvent__end-time">
                                                <span>End time</span>
                                                <input type="datetime-local" value="${endTime}" class="newEvent__input-text" onblur="handleGetInputEndTime(value)">
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="body__newEvent__right">
                                        <h2>Select dish</h2>
                                        <div class="body__newEvent__right__list">
                                        </div>
                                    </div>
                                </div>
                                <div class="newEvent__popup__btn">
                                    <div class="newEvent__popup__create-btn" onclick="handleCreateNewEvent()">
                                        <a href="#" class="btn primary-btn">Create</a> 
                                    </div>
                                    <div class="newEvent__popup__close-btn">
                                        <a href="#" class="btn primary-btn" onclick="closeNewEventBtn()">Close</a> 
                                    </div>
                                </div>
                            `
}

function closeNewEventBtn() {
    newEventForm.style.display = 'none'
    setNewEventValue();
}

function openNewEventBtn(index) {
    var reset_input_values = document.getElementsByClassName("newEvent__input-text");
    for (var i = 0; i < reset_input_values.length; i++) {
        reset_input_values[i].value = '';
    }
    newEventForm.style.display = 'block'

    if(index == -1) {
        showDishes([]);
    } else {
        showDishes(listEvent[index].discount);
    }
}


function showDishes(discountValue) {
    console.log(discountValue)
    var showListDish = document.getElementsByClassName("body__newEvent__right__list")[0]
    for(let i = 0; i < listDish.length; i++) {
        if(discountValue.length == 0) {
            showListDish.innerHTML +=   `
                                    <div class="body__newEvent__right__item">
                                        <div class="body__newEvent__right__item__img">
                                            <img src="../images/food-2.png" alt="">
                                        </div>
                                        <div class="body__newEvent__right__item__name">
                                            ${listDish[i].dishName}
                                        </div>
                                        <div>
                                            <input type="text" placeholder="E.g. 10" class="body__newEvent__right__item__input" onclick="removeInvalidDish('body__newEvent__right__item', ${i})" onBlur="handleGetInputDiscountRate(${listDish[i].dishID}, ${i},  value)">
                                        </div> 
                                    </div>
                                    `
        } else {
            for(let value of discountValue){
                if(listDish[i].dishID == value.dishID) {
                    showListDish.innerHTML +=   `
                                        <div class="body__newEvent__right__item">
                                            <div class="body__newEvent__right__item__img">
                                                <img src="../images/food-2.png" alt="">
                                            </div>
                                            <div class="body__newEvent__right__item__name">
                                                ${listDish[i].dishName}
                                            </div>
                                            <div>
                                                <input type="text" value="${value.discount}" class="body__newEvent__right__item__input" onclick="removeInvalidDish('body__newEvent__right__item', ${i})" onBlur="handleGetInputDiscountRate(${listDish[i].dishID}, ${i},  value)">
                                            </div> 
                                        </div>
                                        `
                    break;
                } 
            }
            showListDish.innerHTML +=   `
                                    <div class="body__newEvent__right__item">
                                        <div class="body__newEvent__right__item__img">
                                            <img src="../images/food-2.png" alt="">
                                        </div>
                                        <div class="body__newEvent__right__item__name">
                                            ${listDish[i].dishName}
                                        </div>
                                        <div>
                                            <input type="text" placeholder="E.g. 10" class="body__newEvent__right__item__input" onclick="removeInvalidDish('body__newEvent__right__item', ${i})" onBlur="handleGetInputDiscountRate(${listDish[i].dishID}, ${i},  value)">
                                        </div> 
                                    </div>
                                    `
        }
    }
}



var discountDish = [];

function newDiscount(dishID, discount) {
    var discountDish = {
        "dishID": dishID,
        "discount": discount
    }

    return discountDish;
}


// form validation
function removeInvalidForm(className, index) {
    let inputTag = document.getElementsByClassName(className)[0].getElementsByTagName("input")[0];
    inputTag.classList.remove("invalid__input-border");
    inputTag = document.getElementsByClassName(className)[0].getElementsByTagName("div")[index];
    inputTag.remove();
}

function removeInvalidDish(className, index) {
    let inputBorder = document.getElementsByClassName(className)[index];
    inputBorder.classList.remove("invalid__input-border")

    let invalidMessage = document.getElementsByClassName("body__newEvent__right")[0].getElementsByClassName("invalid__input-message")[0]
    if(invalidMessage) {
        invalidMessage.remove();
    }
}

function handleGetInputName(name) {
    if(name) {
        newEvent.eventName = name;
    } else {
        let newEventInputName = document.getElementsByClassName("newEvent__name")[0]
        newEventInputName.innerHTML =   `
                                        <span>Name</span>
                                        <input type="text" class="newEvent__input-text invalid__input-border" onclick="removeInvalidForm('newEvent__name', 0)" onblur="handleGetInputName(value)">
                                        <div class="invalid__input-message">
                                            <img src="../images/info.png" class="invalid__input-icon" alt="">
                                            <p>Enter a name</p>
                                        </div>
                                        `
    }
    
}

function handleGetInputDescription(description) {
    if(description) {
        newEvent.description = description;
    } else {
        let newEventInputDescription = document.getElementsByClassName("newEvent__description")[0]
        newEventInputDescription.innerHTML =    `
                                                <span>Description</span>
                                                <input type="text" class="newEvent__input-text invalid__input-border" onclick="removeInvalidForm('newEvent__description', 0)" onblur="handleGetInputDescription(value)">
                                                <div class="invalid__input-message">
                                                    <img src="../images/info.png" class="invalid__input-icon" alt="">
                                                    <p>Enter a description</p>
                                                </div>
                                                `
    }
}

function handleGetInputBeginTime(beginTime) {
    let newEventInputBeginTime = document.getElementsByClassName("newEvent__begin-time")[0]
    if(beginTime) {
        if(newEvent.endTime) {
            begin = new Date(beginTime);
            end = new Date(newEvent.endTime);
            if(end <= begin) {
                newEventInputBeginTime.innerHTML =    `
                                                <span>Start time</span>
                                                <input type="datetime-local" class="newEvent__input-text invalid__input-border" onclick="removeInvalidForm('newEvent__begin-time', 0)" onblur="handleGetInputBeginTime(value)">
                                                <div class="invalid__input-message">
                                                    <img src="../images/info.png" class="invalid__input-icon" alt="">
                                                    <p>Begin time must be smaller than end time</p>
                                                </div>
                                                `
            } else {
                newEvent.beginTime = beginTime;
            }
        } else {
            newEvent.beginTime = beginTime;
        }
    } else {
        newEventInputBeginTime.innerHTML =    `
                                                <span>Start time</span>
                                                <input type="datetime-local" class="newEvent__input-text invalid__input-border" onclick="removeInvalidForm('newEvent__begin-time', 0)" onblur="handleGetInputBeginTime(value)">
                                                <div class="invalid__input-message">
                                                    <img src="../images/info.png" class="invalid__input-icon" alt="">
                                                    <p>Chose a specific time</p>
                                                </div>
                                                `
    }
}

function handleGetInputEndTime(endTime) {
    let newEventInputEndTime = document.getElementsByClassName("newEvent__end-time")[0]
    if(endTime) {
        if(newEvent.beginTime) {
            begin = new Date(newEvent.beginTime);
            end = new Date(endTime);
            if(end <= begin) {
                newEventInputEndTime.innerHTML =    `
                                                <span>End time</span>
                                                <input type="datetime-local" class="newEvent__input-text invalid__input-border" onclick="removeInvalidForm('newEvent__end-time')" onblur="handleGetInputEndTime(value)">
                                                <div class="invalid__input-message">
                                                    <img src="../images/info.png" class="invalid__input-icon" alt="">
                                                    <p>Begin time must be smaller than end time</p>
                                                </div>
                                                `
            } else {
                newEvent.endTime = endTime;
            }
        } else {
            newEvent.endTime = endTime;
        }
    } else {
        newEventInputEndTime.innerHTML =    `
                                                <span>End time</span>
                                                <input type="datetime-local" class="newEvent__input-text invalid__input-border" onclick="removeInvalidForm('newEvent__end-time', 0)" onblur="handleGetInputEndTime(value)">
                                                <div class="invalid__input-message">
                                                    <img src="../images/info.png" class="invalid__input-icon" alt="">
                                                    <p>Chose a specific time</p>
                                                </div>
                                                `
    }
}

function handleGetInputDiscountRate(dishID, index, discountRate) {
    let invalidBorder = document.getElementsByClassName("body__newEvent__right__item");
    let invalidMessage = document.getElementsByClassName("body__newEvent__right")[0]
    if(discountRate) {
        if(isNaN(discountRate)){
            invalidBorder[index].classList.add("invalid__input-border");
            invalidMessage.innerHTML +=    `
                                            <div class="invalid__input-message invalid__input-dish">
                                                <img src="../images/info.png" class="invalid__input-icon" alt="">
                                                <p>Discount rate must be a number</p>
                                            </div>
                                            `
        } else if(discountRate <= 0  || discountRate > 100) {
            invalidBorder[index].classList.add("invalid__input-border");
            invalidMessage.innerHTML +=    `
                                            <div class="invalid__input-message invalid__input-dish">
                                                <img src="../images/info.png" class="invalid__input-icon" alt="">
                                                <p>Discount rate must be in range of (0; 100]</p>
                                            </div>
                                            `
        } else {
            for(let dish of discountDish) {
                if(dish.dishID == dishID) {
                    dish.discount = discountRate;
                    return;
                }
            }
            discountDish.push(newDiscount(dishID, discountRate))
        }
    } else {
        invalidBorder[index].classList.add("invalid__input-border");
        invalidMessage.innerHTML +=    `
                                        <div class="invalid__input-message invalid__input-dish">
                                            <img src="../images/info.png" class="invalid__input-icon" alt="">
                                            <p>Discount rate must be in range of (0; 100]</p>
                                        </div>
                                        `
    }
}


function handleCreateNewEvent() {
    check = true;
    if(discountDish.length == 0) {
        let invalidDishBorder = document.getElementsByClassName("body__newEvent__right__list")[0]
        invalidDishBorder.classList.add("invalid__input-border");
        let invalidDishMessage;
        if(invalidDishMessage = invalidDishBorder.getElementsByClassName("invalid__input-message")[0]) {
            invalidDishMessage.innerHTML = `
                                        <div class="invalid__input-message invalid__input-dish">
                                            <img src="../images/info.png" class="invalid__input-icon" alt="">
                                            <p>Discount at least one</p>
                                        </div>
                                        `
        } else {
            invalidDishBorder.outerHTML += `
                                        <div class="invalid__input-message invalid__input-dish">
                                            <img src="../images/info.png" class="invalid__input-icon" alt="">
                                            <p>Discount at least one</p>
                                        </div>
                                        `
        }
        check = false;
    } else {
        newEvent.discount = discountDish;
    }

    if(!newEvent.name) {
        handleGetInputName();
        check = false;
    }

    if(!newEvent.description) {
        handleGetInputDescription();
        check = false;
    }

    if(!newEvent.beginTime) {
        handleGetInputBeginTime();
        check = false;
    }
    
    if(!newEvent.endTimeEndTime) {
        handleGetInputEndTime();
        check = false;
    }

    if(!check) {
        return;
    } 

    
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(newEvent)
    };
    fetch(newEventAPI, options) 
        .then(function(response) {
            response.json();
        })
        .then(function() {
            closeNewEventBtn();
            getEvents();
        });
    
}