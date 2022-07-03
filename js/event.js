
// event-infor-popup
var listEvent = [];
var listDish = [];

var showEventAPI = "http://localhost:3000/showEvent";
var getDishAPI = "http://localhost:3000/getDish";
const  eventItemList = document.getElementsByClassName("body__event__list")[0]
const eventItems = document.getElementsByClassName("body__event__item")
const inforPopup = document.getElementsByClassName("body__event__popup")[0]
const newEventForm = document.querySelector(".body__newEvent")


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
    console.log(listEvent);
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
                                <div class="body__newEvent__btn" onclick="openNewEventBtn()">
                                    <a href="#" class="body__newEvent__btn__icon">
                                        <img src="../images/plus.png" alt="">
                                    </a>
                                </div>
                                `
}

function showEventInfor(id){
    inforPopup.style.display = 'block'
    for(let eventItem of listEvent){
        if(eventItem.id == id){
            //left
            eventInfor = document.getElementsByClassName("event__popup__infor")
            eventInfor[0].innerHTML = eventItem.eventName
            eventInfor[1].innerHTML = eventItem.description
            eventInfor[2].innerHTML = new Date(eventItem.beginTime).toLocaleString()
            eventInfor[3].innerHTML = new Date(eventItem.endTime).toLocaleString()
            
            //right
            dishInfor = document.getElementsByClassName("body__event__popup__right")[0];
            dishInfor.innerHTML =   `
                                    <div class="event__popup__sale">
                                        Discount
                                    </div>
                                    `
            for(discountDish of eventItem.discount){
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
                                        <div class="event__popup__delete-btn" onclick="handleDeleteEvent(${eventItem.id})">
                                            <a href="#" class="btn primary-btn">Delete</a> 
                                        </div>
                                        <div class="event__popup__done-btn" onclick="closeInforPopupBtn()">
                                            <a href="#" class="btn primary-btn">Done</a> 
                                        </div>
                                        `
        }
    }
}


function closeInforPopupBtn(){
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
function closeNewEventBtn() {
    newEventForm.style.display = 'none'
}

function openNewEventBtn() {
    var reset_input_values = document.getElementsByClassName("newEvent__input-text");
    for (var i = 0; i < reset_input_values.length; i++) {
        reset_input_values[i].value = '';
    }
    newEventForm.style.display = 'block'
    showDishes();
}


function showDishes() {
    var showList = document.getElementsByClassName("body__newEvent__right__list")[0]
    for(let dish of listDish) {
        showList.innerHTML +=   `
                                <div class="body__newEvent__right__item"">
                                    <div class="body__newEvent__right__item__img">
                                        <img src="../images/food-2.png" alt="">
                                    </div>
                                    <div class="body__newEvent__right__item__name">
                                        ${dish.dishName}
                                    </div>
                                    <div>
                                        <input type="text" value="0" class="body__newEvent__right__item__input" onChange="handleGetInputDiscountRate(${dish.dishID}, value)">
                                    </div>
                                    <div class="body__newEvent__right__item__select">
                                        <input type="checkbox" class="body__newEvent__right__item__select" onChange="handleGetInputSelectDish(${dish.dishID}, value)">
                                    </div>
                                </div>
                                `
    }
}



var newEvent = 
{
    "eventName": null,
    "description": null,
    "beginTime": null,
    "endTime": null,
    "discount": []
}

var discountDish = [];

function newDiscount(dishID, discount) {
    var discountDish = {
        "dishID": dishID,
        "discount": discount
    }

    return discountDish;
}

function handleGetInputName(name) {
    newEvent.eventName = name;
}

function handleGetInputDescription(description) {
    newEvent.description = description;
}

function handleGetInputBeginTime(beginTime) {
    newEvent.beginTime = beginTime;
}

function handleGetInputEndTime(endTime) {
    newEvent.endTime = endTime;
}

function handleGetInputDiscountRate(dishID, discountRate) {
    for(let dish of discountDish) {
        if(dish.dishID == dishID) {
            dish.discount = discountRate;
            return;
        }
    }
    discountDish.push(newDiscount(dishID, discountRate))
}

function handleGetInputSelectDish(dishID, isSelect) {
    if(isSelect == false) {
        for(let i = 0; i < discountDish.length; i++) {
            if(discountDish[i].dishID == dishID) {
                discountDish.slice(i, 1);
                return;
            }
        }
    }

    for(let dish of discountDish) {
        if(dish.dishID == dishID) {
            return;
        }
    }
    discountDish.push(newDiscount(dishID, null))
}

function handleCreateNewEvent() {
    newEvent.discount = discountDish;

    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(newEvent)
    };
    fetch(showEventAPI, options) 
        .then(function(response) {
            response.json();
        })
        .then(function() {
            closeNewEventBtn();
            getEvents();
        });
    
}