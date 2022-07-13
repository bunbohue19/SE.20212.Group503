import { role } from './role.js'

console.log(role);

var listEvent = [];
var newEvent = 
{     "id": null,
      "name": null,
      "description": null,
      "beginTime": null,
      "endTime": null,
      "discount": [
        {
            "rank": "Bronze",
            "discountRate": null
          },
          {
            "rank": "Silver",
            "discountRate": null
          },
          {
            "rank": "Gold",
            "discountRate": null
          },
          {
            "rank": "Diamond",
            "discountRate": null
          }
      ]
}

var GETeventAPI = "http://localhost:3000/getEvent";
var POSTeventAPI = "http://localhost:3000/getEvent";
var PUTeventAPI = "http://localhost:3000/getEvent";
var DELETEeventAPI = "http://localhost:3000/getEvent";

var bodyEventList = document.getElementsByClassName("body__event__list")[0]
var bodyEventItem = document.getElementsByClassName("body__event__item")
var bodyEventPopup = document.getElementsByClassName("body__event__popup")[0]
var bodyNewEvent = document.getElementsByClassName("body__new__event")[0]


function start(){
    getEvents();
}

start();

function getEvents(){
    fetch(GETeventAPI)
    .then(function(response){
        return response.json();
    })
    .then(function(getEvent){
        listEvent = getEvent;
        showEvents();
    });
}


//show event handler
window.showEvents = function(){
    bodyEventList.innerHTML = ``;
    for(let i = 0; i < listEvent.length; i++){
            bodyEventList.innerHTML +=  ` 
                                        <div class="body__event__item" onclick="showEventInfor(${i})">
                                            <a href="#" class="body__event__item__icon">
                                                <img src="../images/eventsMedia1.png" alt="">
                                            </a>
                                            <p class="body__event__item__title">
                                                ${listEvent[i].name}
                                            </p>
                                        </div>
                                        `
    }
    
    if(role == 1){
        bodyEventList.innerHTML +=  ` 
                                    <div class="body__new__event__btn" onclick="openNewEventBtn()">
                                        <a href="#" class="body__new__event__btn__icon">
                                            <img src="../images/plus.png" alt="">
                                        </a>
                                    </div>
        `
    }
}


window.getRankDiscount = function(rank, discountList) {
    for(let discount of discountList) {
        if(discount.rank == rank) {
            return discount.discountRate;
        }
    }
}

// function showEventInfor(index){
window.showEventInfor = function(index) {
    bodyEventPopup.innerHTML = `
                                <h2>Information</h2>
                                <div class="body__event__popup__container">
                                    <div class="body__event__popup__left">
                                        <ul>
                                            <li class="event__popup__name">
                                                Name
                                                <p class="event__popup__infor">
                                                    ${listEvent[index].name}
                                                </p>
                                            </li>
                                            <li class="event__popup__description">
                                                Description
                                                <p class="event__popup__infor">
                                                    ${listEvent[index].description}
                                                </p>
                                            </li>
                                            <li class="event__popup__start">
                                                Start time
                                                <p class="event__popup__infor">
                                                    ${listEvent[index].beginTime}
                                                </p>
                                            </li>
                                            <li class="event__popup__end">
                                                End time 
                                                <p class="event__popup__infor">
                                                    ${listEvent[index].endTime}
                                                </p>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="body__event__popup__right">
                                        <div class="body__event__popup__right__rank">
                                            <div class="body__event__popup__right__rank-bronze">
                                                <span>Bronze Discount</span>
                                                <p class="event__popup__infor">${getRankDiscount('Bronze', listEvent[index].discount)}%</p>
                                            </div>
                                            <div class="body__event__popup__right__rank-silver">
                                                <span>Silver Discount</span>
                                                <p class="event__popup__infor">${getRankDiscount('Silver', listEvent[index].discount)}%</p>
                                            </div>
                                            <div class="body__event__popup__right__rank-gold">
                                                <span>Gold Discount</span>
                                                <p class="event__popup__infor">${getRankDiscount('Gold', listEvent[index].discount)}%</p>
                                            </div>
                                            <div class="body__event__popup__right__rank-diamond">
                                                <span>Diamond Discount</span>
                                                <p class="event__popup__infor">${getRankDiscount('Diamond', listEvent[index].discount)}%</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="event__popup__btn">
                                    <div class="event__popup__done-btn" onclick="closeInforPopupBtn()">
                                        <a href="#" class="btn primary-btn">Done</a> 
                                    </div>
                                </div>
    `
    if(role == 1) {
        var eventPopupBtn = bodyEventPopup.getElementsByClassName("event__popup__btn")[0];
        eventPopupBtn.innerHTML += `
                                    <div class="event__popup__edit-btn" onclick="openEditEvent(${index})">
                                        <a href="#" class="btn primary-btn">Edit</a> 
                                    </div>
                                    <div class="event__popup__delete-btn" onclick="handleDeleteEvent(${listEvent[index].id})">
                                        <a href="#" class="btn primary-btn">Delete</a> 
                                    </div>
        `
    }
}


window.closeInforPopupBtn = function () {
    bodyEventPopup.innerHTML = ``;
}

window.handleDeleteEvent = function(id){
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
          },
    };
    fetch(DELETEeventAPI + '/' + id, options) 
        .then(function(response) {
            response.json();
        })
        .then(function() {
            closeInforPopupBtn();
            listEvent = [];
            newEvent = 
            {     
                "id": null,
                "name": null,
                "description": null,
                "beginTime": null,
                "endTime": null,
                "discount": [
                    {
                        "rank": "Bronze",
                        "discountRate": null
                      },
                      {
                        "rank": "Silver",
                        "discountRate": null
                      },
                      {
                        "rank": "Gold",
                        "discountRate": null
                      },
                      {
                        "rank": "Diamond",
                        "discountRate": null
                      }
                ]
            }
            getEvents();
        });
}

window.getDiscountRate = function (index, rank) {
    var rate;
    for(let discount of listEvent[index].discount) {
        if(discount.rank == rank) {
            rate = discount.discountRate;
        }
    }
    return rate;
}

window.openEditEvent = function (index) {
    closeInforPopupBtn();
    newEvent.name = listEvent[index].name;
    newEvent.description = listEvent[index].description;
    newEvent.beginTime = new Date(listEvent[index].beginTime).toISOString().slice(0, 16);
    newEvent.endTime = new Date(listEvent[index].endTime).toISOString().slice(0, 16);
    newEvent.discount = listEvent[index].discount;

    bodyNewEvent.innerHTML = `
                                <h2>New Event</h2>
                                <div class="body__new__event__container">
                                    <div class="body__new__event__left">
                                        <ul>
                                            <li class="new__event__name">
                                                <span>Name</span>

                                                <input type="text" value="${listEvent[index].name}" class="new__event__input-text" 
                                                onclick="removeInvalidEffect('new__event__name', 0)" 
                                                onblur="handleGetInputName(value)">

                                                <div class="invalid__input-message">
                                                </div>
                                            </li>
                                            <li class="new__event__description">
                                                <span>Description</span>

                                                <input type="text" value="${listEvent[index].description}" class="new__event__input-text" 
                                                onclick="removeInvalidEffect('new__event__description', 1)" 
                                                onblur="handleGetInputDescription(value)">

                                                <div class="invalid__input-message">
                                                </div>
                                            </li>
                                            <div class="new__event__poster-upload">
                                                <span>Poster</span>
                                                <label for="fileImage" class=" btn primary-btn new__event__poster-upload-label">Upload</label>
                                                <input type="file" th:name="files" id="fileImage" accept="image/png, image/jpeg" required style='display:none' >
                                            </div>
                                            <li class="new__event__begin-time">
                                                <span>Begin time</span>

                                                <input type="datetime-local" value="${new Date(listEvent[index].beginTime).toISOString().slice(0, 16)}" class="new__event__input-text" 
                                                onclick="removeInvalidEffect('new__event__begin-time', 2)" 
                                                onblur="handleGetInputBeginTime(value)">

                                                <div class="invalid__input-message">
                                                </div>
                                            </li>
                                            <li class="new__event__end-time">
                                                <span>End time</span>

                                                <input type="datetime-local" value="${new Date(listEvent[index].endTime).toISOString().slice(0, 16)}" class="new__event__input-text" 
                                                onclick="removeInvalidEffect('new__event__end-time', 3)" 
                                                onblur="handleGetInputStopTime(value)">

                                                <div class="invalid__input-message">
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="body__new__event__right">
                                        <div class="body__new__event__right__rank">
                                            <div class="body__new__event__right__rank-bronze">
                                                <span>Bronze Discount</span>
                                                <input type="text" value="${getDiscountRate(index, 'Bronze')}" class="new__event__input-text"
                                                    onclick="removeInvalidEffect('body__new__event__right__rank-bronze', 4)" 
                                                    onblur="handleGetInputDiscountRank('body__new__event__right__rank-bronze', 'Bronze', 4, value)">
                                                <div class="invalid__input-message" style="margin-left: 10px">
                                                </div>
                                            </div>
                                            <div class="body__new__event__right__rank-silver">
                                                <span>Silver Discount</span>
                                                <input type="text" value="${getDiscountRate(index, 'Silver')}" class="new__event__input-text" 
                                                    onclick="removeInvalidEffect('body__new__event__right__rank-silver', 5)" 
                                                    onblur="handleGetInputDiscountRank('body__new__event__right__rank-silver', 'Silver', 5, value)">
                                                <div class="invalid__input-message" style="margin-left: 10px">
                                                </div>
                                            </div>
                                            <div class="body__new__event__right__rank-gold">
                                                <span>Gold Discount</span>
                                                <input type="text" value="${getDiscountRate(index, 'Gold')}" class="new__event__input-text" 
                                                    onclick="removeInvalidEffect('body__new__event__right__rank-gold', 6)" 
                                                    onblur="handleGetInputDiscountRank('body__new__event__right__rank-gold', 'Gold', 6, value)">
                                                <div class="invalid__input-message" style="margin-left: 10px">
                                                </div>
                                            </div>
                                            <div class="body__new__event__right__rank-diamond">
                                                <span>Diamond Discount</span>
                                                <input type="text" value="${getDiscountRate(index, 'Diamond')}" class="new__event__input-text" 
                                                    onclick="removeInvalidEffect('body__new__event__right__rank-diamond', 7)" 
                                                    onblur="handleGetInputDiscountRank('body__new__event__right__rank-diamond', 'Diamond', 7, value)">
                                                <div class="invalid__input-message" style="margin-left: 10px">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="new__event__popup__btn">
                                    <div class="new__event__popup__create-btn" onclick="handleEditEvent(${index})">
                                        <a href="#" class="btn primary-btn">Apply</a> 
                                    </div>
                                    <div class="new__event__popup__close-btn">
                                        <a href="#" class="btn primary-btn" onclick="closeNewEventBtn()">Close</a> 
                                    </div>
                                </div>
    `
}

window.handleEditEvent = function (index) {
    var isValid = true;
    
    if(!newEvent.name) {
        handleGetInputName();
        isValid = false;
    }

    if(!newEvent.description) {
        handleGetInputDescription();
        isValid = false;
    }

    if(!newEvent.beginTime) {
        handleGetInputBeginTime();
        isValid = false;
    }
    
    if(!newEvent.endTime) {
        handleGetInputStopTime();
        isValid = false;
    }

    for(let discount in newEvent.discount) {
        if(!discount.discountRate) {
            if(discount.rank == 'Bronze') {
                handleGetInputDiscountRank('body__new__event__right__rank-bronze', 'Bronze', 4);
                isValid = false;
            }
            if(discount.rank == 'Silver') {
                handleGetInputDiscountRank('body__new__event__right__rank-silver', 'Silver', 5);
                isValid = false;
            }
            if(discount.rank == 'Gold') {
                handleGetInputDiscountRank('body__new__event__right__rank-gold', 'Gold', 6);
                isValid = false;
            }
            if(discount.rank == 'Diamond') {
                handleGetInputDiscountRank('body__new__event__right__rank-diamond', 'Diamond', 7);
                isValid = false;
            }
        } 
    }

    if(isValid) {
        var options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(newEvent)
        };
        fetch(PUTeventAPI +'/' + listEvent[index].id, options) 
            .then(function(response) {
                response.json();
            })
            .then(function() {
                listEvent = [];
                newEvent = 
                {     
                    "id": null,
                    "name": null,
                    "description": null,
                    "beginTime": null,
                    "endTime": null,
                    "discount": [
                        {
                            "rank": "Bronze",
                            "discountRate": null
                          },
                          {
                            "rank": "Silver",
                            "discountRate": null
                          },
                          {
                            "rank": "Gold",
                            "discountRate": null
                          },
                          {
                            "rank": "Diamond",
                            "discountRate": null
                          }
                    ]
                }
                closeNewEventBtn();
                getEvents();
            });
    } 
}


//new Event handler
window.openNewEventBtn = function () {
    bodyNewEvent.innerHTML = `
                                <h2>New Event</h2>
                                <div class="body__new__event__container">
                                    <div class="body__new__event__left">
                                        <ul>
                                            <li class="new__event__name">
                                                <span>Name</span>
                                                <input type="text" class="new__event__input-text" 
                                                    onclick="removeInvalidEffect('new__event__name', 0)" 
                                                    onblur="handleGetInputName(value)">
                                                <div class="invalid__input-message">
                                                </div>
                                            </li>
                                            <li class="new__event__description">
                                                <span>Description</span>
                                                <input type="text" class="new__event__input-text" 
                                                    onclick="removeInvalidEffect('new__event__description', 1)" 
                                                    onblur="handleGetInputDescription(value)">
                                                <div class="invalid__input-message">
                                                </div>
                                            </li>
                                            <div class="new__event__poster-upload">
                                                <span>Poster</span>
                                                <label for="fileImage" class=" btn primary-btn new__event__poster-upload-label">Upload</label>
                                                <input type="file" th:name="files" id="fileImage" accept="image/png, image/jpeg" required style='display:none' >
                                            </div>
                                            <li class="new__event__begin-time">
                                                <span>Begin time</span>
                                                <input type="datetime-local" class="new__event__input-text" 
                                                    onclick="removeInvalidEffect('new__event__begin-time', 2)" 
                                                    onblur="handleGetInputBeginTime(value)">
                                                <div class="invalid__input-message">
                                                </div>
                                            </li>
                                            <li class="new__event__end-time">
                                                <span>End time</span>
                                                <input type="datetime-local" class="new__event__input-text" 
                                                    onclick="removeInvalidEffect('new__event__end-time', 3)"
                                                    onblur="handleGetInputStopTime(value)">
                                                <div class="invalid__input-message">
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="body__new__event__right">
                                        <div class="body__new__event__right__rank">
                                            <div class="body__new__event__right__rank-bronze">
                                                <span>Bronze Discount</span>
                                                <input type="text" class="new__event__input-text"
                                                onclick="removeInvalidEffect('body__new__event__right__rank-bronze', 4)" 
                                                onblur="handleGetInputDiscountRank('body__new__event__right__rank-bronze', 'Bronze', 4, value)">
                                                <div class="invalid__input-message" style="margin-left: 10px">
                                                </div>
                                            </div>
                                            <div class="body__new__event__right__rank-silver">
                                                <span>Silver Discount</span>
                                                <input type="text" class="new__event__input-text" 
                                                onclick="removeInvalidEffect('body__new__event__right__rank-silver', 5)" 
                                                onblur="handleGetInputDiscountRank('body__new__event__right__rank-silver', 'Silver', 5, value)">
                                                <div class="invalid__input-message" style="margin-left: 10px">
                                                </div>
                                            </div>
                                            <div class="body__new__event__right__rank-gold">
                                                <span>Gold Discount</span>
                                                <input type="text" class="new__event__input-text" 
                                                onclick="removeInvalidEffect('body__new__event__right__rank-gold', 6)" 
                                                onblur="handleGetInputDiscountRank('body__new__event__right__rank-gold', 'Gold', 6, value)">
                                                <div class="invalid__input-message" style="margin-left: 10px">
                                                </div>
                                            </div>
                                            <div class="body__new__event__right__rank-diamond">
                                                <span>Diamond Discount</span>
                                                <input type="text" class="new__event__input-text" 
                                                onclick="removeInvalidEffect('body__new__event__right__rank-diamond', 7)" 
                                                onblur="handleGetInputDiscountRank('body__new__event__right__rank-diamond', 'Diamond', 7, value)">
                                                <div class="invalid__input-message" style="margin-left: 10px">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="new__event__popup__btn">
                                    <div class="new__event__popup__create-btn" onclick="handleCreateNewEvent()">
                                        <a href="#" class="btn primary-btn">Create</a> 
                                    </div>
                                    <div class="new__event__popup__close-btn">
                                        <a href="#" class="btn primary-btn" onclick="closeNewEventBtn()">Close</a> 
                                    </div>
                                </div>
    `
}

window.closeNewEventBtn = function () {
    bodyNewEvent.innerHTML = ``
}


// form validation
window.getInvalidMessage = function(message) {
    var invalidMessage = `
                            <img src="../images/info.png" class="invalid__input-icon" alt="">
                            <p>${message}</p>
    `
    return invalidMessage;
}

window.handleInvalidEffect = function (validPath, index, message) {
    let invalidBorder = document.getElementsByClassName("new__event__input-text")[index];
    invalidBorder.classList.add("invalid__input-border");

    let invalidMessage = document.getElementsByClassName(validPath)[0].getElementsByClassName("invalid__input-message")[0];
    invalidMessage.innerHTML = getInvalidMessage(message);
}

window.removeInvalidEffect = function (path, index) {
    let containerInput = document.getElementsByClassName(path)[0];
    let invalidMessage = containerInput.getElementsByClassName("invalid__input-message")[0];
    invalidMessage.innerHTML = ``

    let invalidBorder = document.getElementsByClassName("new__event__input-text")[index];
    if(invalidBorder.classList.contains("invalid__input-border")) {
        invalidBorder.classList.remove("invalid__input-border")
    }
}


window.handleGetInputName = function (name) {
    if(name) {
        newEvent.name = name;
    } else {
        handleInvalidEffect('new__event__name', 0, 'Enter a name');
    }
}

window.handleGetInputDescription = function(description) {
    if(description) {
        newEvent.description = description;
    } else {
        handleInvalidEffect('new__event__description', 1, 'Enter a description');
    }
}

window.handleGetInputBeginTime = function(beginTime) {
    if(beginTime) {
        if(newEvent.endTime) {
            let begin = new Date(beginTime);
            let end = new Date(newEvent.endTime);
            if(end <= begin) {
                handleInvalidEffect('new__event__begin-time', 2, 'Begin time must be smaller than end time');
            } else {
                newEvent.beginTime = beginTime;
            }
        } else {
            newEvent.beginTime = beginTime;
        }
    } else {
        handleInvalidEffect('new__event__begin-time', 2, 'Chose a specific time');
    }
}

window.handleGetInputStopTime = function(endTime) {
    if(endTime) {
        if(newEvent.beginTime) {
            let begin = new Date(newEvent.beginTime);
            let end = new Date(endTime);
            if(end <= begin) {
                handleInvalidEffect('new__event__end-time', 3, 'Begin time must be smaller than end time');
            } else {
                newEvent.endTime = endTime;
            }
        } else {
            newEvent.endTime = endTime;
        }
    } else {
        handleInvalidEffect('new__event__end-time', 3, 'Chose a specific time');
    }
}


window.handleGetInputDiscountRank = function(path, rank, index, rate) {
    if(rate) {
        if(isNaN(rate)) {
            handleInvalidEffect(path, index, 'Discount rate must be a number!');
        } else {
            if(rate < 0 || rate > 100) {
                handleInvalidEffect(path, index, 'Discount rate must be in range of [0; 100]!');
            } else {
                for(let discount of newEvent.discount) {
                    if(discount.rank == rank){
                        discount.discountRate = rate;
                    }
                }
            }
        }
    } else {
        handleInvalidEffect(path, index, 'Enter a specific number!');
    }
}

window.handleCreateNewEvent = function() {
    var isValid = true;
    
    if(!newEvent.name) {
        handleGetInputName();
        isValid = false;
    }

    if(!newEvent.description) {
        handleGetInputDescription();
        isValid = false;
    }

    if(!newEvent.beginTime) {
        handleGetInputBeginTime();
        isValid = false;
    }
    
    if(!newEvent.endTime) {
        handleGetInputStopTime();
        isValid = false;
    }

    for(let discount in newEvent.discount) {
        if(!discount.discountRate) {
            if(discount.rank == 'Bronze') {
                handleGetInputDiscountRank('body__new__event__right__rank-bronze', 'Bronze', 4);
                isValid = false;
            }
            if(discount.rank == 'Silver') {
                handleGetInputDiscountRank('body__new__event__right__rank-silver', 'Silver', 5);
                isValid = false;
            }
            if(discount.rank == 'Gold') {
                handleGetInputDiscountRank('body__new__event__right__rank-gold', 'Gold', 6);
                isValid = false;
            }
            if(discount.rank == 'Diamond') {
                handleGetInputDiscountRank('body__new__event__right__rank-diamond', 'Diamond', 7);
                isValid = false;
            }
        } 
    }

    if(isValid) {
        var options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(newEvent)
        };
        fetch(POSTeventAPI, options) 
            .then(function(response) {
                response.json();
            })
            .then(function() {
                listEvent = [];
                newEvent = 
                {     
                    "id": null,
                    "name": null,
                    "description": null,
                    "beginTime": null,
                    "endTime": null,
                    "discount": [
                        {
                            "rank": "Bronze",
                            "discountRate": null
                          },
                          {
                            "rank": "Silver",
                            "discountRate": null
                          },
                          {
                            "rank": "Gold",
                            "discountRate": null
                          },
                          {
                            "rank": "Diamond",
                            "discountRate": null
                          }
                    ]
                }
                closeNewEventBtn();
                getEvents();
            });
    } 
}