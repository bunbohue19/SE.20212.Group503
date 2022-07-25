import { role } from './role.js'
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrtx2Mi4DICXwlwABVb0EIIybBTVqo_Wo",
  authDomain: "se20212group503.firebaseapp.com",
  projectId: "se20212group503",
  storageBucket: "se20212group503.appspot.com",
  messagingSenderId: "922521069241",
  appId: "1:922521069241:web:c319a760c14d5ca33add68"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
import {getStorage, ref as sRef, uploadBytesResumable, getDownloadURL}
from "https://www.gstatic.com/firebasejs/9.9.0/firebase-storage.js";

var poster = [];
var listEvent = [];
var newEvent = 
{     "id": null,
      "name": null,
      "description": null,
      "poster": null,
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

var GETeventAPI = "http://localhost:8081/event/active";
var POSTeventAPI = "http://localhost:8081/event";
var PUTeventAPI = "http://localhost:8081/event";
var DELETEeventAPI = "http://localhost:8081/event";

var bodyEventList = document.getElementsByClassName("body__event__list")[0]
var bodyEventItem = document.getElementsByClassName("body__event__item")
var bodyEventPopup = document.getElementsByClassName("body__event__popup")[0]
var bodyNewEvent = document.getElementsByClassName("body__new__event")[0]


function start(){
    getEvents();
    setRole();
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

function setRole() {
    var navRole = document.getElementsByClassName("nav__role")[0];
    if(role == 1) {
        navRole.innerHTML = `
                            <div class="nav__role__img">
                                <a href="home.html">
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
                            <a href="home.html">
                                <img src="../images/staff.png" alt="thenf">
                            </a>
                        </div>
                        <p class="nav__staff__text">
                            Staff
                        </p>
    `
    }
}

//show event handler
window.showEvents = function(){
    bodyEventList.innerHTML = ``;
    for(let i = 0; i < listEvent.length; i++){
            bodyEventList.innerHTML +=  ` 
                                        <div class="body__event__item" onclick="showEventInfor(${i})">
                                            <a href="#" class="body__event__item__icon">
                                                <img src="${listEvent[i].poster}" alt="">
                                            </a>
                                            <p class="body__event__item__title">
                                                ${listEvent[i].id}. ${listEvent[i].name}
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
                                    <div class="event__popup__delete-btn" onclick="handleDeleteEvent(${index})">
                                        <a href="#" class="btn primary-btn">Delete</a> 
                                    </div>
        `
    }
}


window.closeInforPopupBtn = function () {
    bodyEventPopup.innerHTML = ``;
}

window.handleDeleteEvent = function (index) {
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(listEvent[index])
    };
    fetch(DELETEeventAPI, options) 
        .then(function(response) {
            response.json();
        })
        .then(function() {
            closeInforPopupBtn();
            poster = [];
            listEvent = [];
            newEvent = 
            {     
                "id": null,
                "name": null,
                "description": null,
                "poster": null,
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
    newEvent.id = listEvent[index].id;
    newEvent.name = listEvent[index].name;
    newEvent.description = listEvent[index].description;
    newEvent.beginTime = new Date(listEvent[index].beginTime).toISOString().slice(0, 16);
    newEvent.endTime = new Date(listEvent[index].endTime).toISOString().slice(0, 16);
    newEvent.discount = listEvent[index].discount;
    newEvent.poster = listEvent[index].poster;

    bodyNewEvent.innerHTML = `
                                <h2>Edit Event</h2>
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
                                                <input type="file" id="fileImage" accept="image/png, image/jpeg" style='display:none'>
                                                <span class="new__event__poster-upload-preview"></span>
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

    // upload image to firebase
    const reader = new FileReader();
    const input = document.getElementById("fileImage");
    input.type = 'file';
    input.onchange = e => {
        poster = e.target.files;
        reader.readAsDataURL(poster[0]);
        const preview = document.getElementsByClassName("new__event__poster-upload-preview")[0]
        preview.innerHTML = "Loading";
        uploadImage(getImageName());
    }
}

window.handleEditEvent = async function (index) {
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
                poster = [];
                listEvent = [];
                newEvent = 
                {     
                    "id": null,
                    "name": null,
                    "description": null,
                    "poster": null,
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
                                                <input type="file" id="fileImage" accept="image/png, image/jpeg" style='display:none'">
                                                <span class="new__event__poster-upload-preview"></span>
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
    // upload image to firebase
    var reader = new FileReader();
    var input = document.getElementById("fileImage");
    input.type = 'file';
    input.onchange = e => {
        poster = e.target.files;
        reader.readAsDataURL(poster[0]);
        var preview = document.getElementsByClassName("new__event__poster-upload-preview")[0]
        preview.innerHTML = "Load";
        uploadImage(getImageName());
    }
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


async function uploadImage(imageName) {
    const metaData = {
        contentType: poster[0].type
    }
    const storage = getStorage();
    const storageRef = sRef(storage, "images/"+imageName);
    
    uploadBytesResumable(storageRef, poster[0], metaData)
        .then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                newEvent.poster = url;
                var preview = document.getElementsByClassName("new__event__poster-upload-preview")[0]
                preview.innerHTML = getImageName();
            });
        }).catch((error) => {
            console.error('Upload failed', error);
        });
}


function getImageName() {
    var temp = poster[0].name.split('\\');
    temp = temp.slice((temp.length-1), (temp.length));
    temp = temp[0].split('.');
    var fileName = temp.slice(0, -1).join('.');
    temp = poster[0].name.split('.');
    var ext = temp.slice((temp.length-1), (temp.length));
    return (fileName + '.' + ext[0]);
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

window.handleCreateNewEvent = async function() {
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
            body: JSON.stringify(newDish)
        };
        fetch(PUTeventAPI, options) 
            .then(function(response) {
                response.json();
            })
            .then(function() {
                poster = [];
                listEvent = [];
                newEvent = 
                {     
                    "id": null,
                    "name": null,
                    "description": null,
                    "poster": null,
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
                start();
            });
    } 
}