import { getRole } from './login.js';
var role = getRole();
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
var listFood = [];
var listDishes = [];
var newDish = 
{
    "cost": null,
    "name": null,
    "description": null,
    "poster": null,
    "catagory": null,
    "dishInCombo": []
}

var categoryIndex = {
    "combo": 0,
    "appetizer": 1,
    "mainCourse": 2,
    "dessert": 3,
    "drinks": 4
}


var GETmenuAPI = "http://localhost:8081/menu";
var GETfoodAPI = "http://localhost:8081/menu/order";
var menuAPI = "http://localhost:8081/menu";

var bodyMenuCombo = document.getElementsByClassName("body__menu__combo")[0].getElementsByClassName("body__menu__list")[0];
var bodyMenuAppetizer = document.getElementsByClassName("body__menu__appetizer")[0].getElementsByClassName("body__menu__list")[0];
var bodyMenuMainCourse = document.getElementsByClassName("body__menu__main-course")[0].getElementsByClassName("body__menu__list")[0];
var bodyMenuDessert = document.getElementsByClassName("body__menu__dessert")[0].getElementsByClassName("body__menu__list")[0];
var bodyMenuDrinks = document.getElementsByClassName("body__menu__drinks")[0].getElementsByClassName("body__menu__list")[0];
var bodyMenuShowCombo = document.getElementsByClassName("body__menu__show-combo")[0];
var bodyMenuShowDish = document.getElementsByClassName("body__menu__show-dish")[0];
var bodyMenuNewCombo = document.getElementsByClassName("body__menu__new-combo")[0];
var bodyMenuNewDish = document.getElementsByClassName("body__menu__new-dish")[0];

function start(){
    getFoodByCategory();
    getFoods();
    setRole();
}

start();

function getFoodByCategory(){
    fetch(GETmenuAPI)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        listFood = data;

        showDishes(bodyMenuCombo, "combo");
        showDishes(bodyMenuAppetizer, "appetizer");
        showDishes(bodyMenuMainCourse, "mainCourse");
        showDishes(bodyMenuDessert, "dessert");
        showDishes(bodyMenuDrinks, "drinks");
    });
}

function getFoods(){
    fetch(GETfoodAPI)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        listDishes = data;
        console.log(data);
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

function showDishes(showByCategory, category) {
    showByCategory.innerHTML = ``;
    for(let i = 0; i < listFood[category].length; i++){
        if(!listFood[category][i].poster) {
            listFood[category][i].poster = "../images/food-2.png";
        }
        showByCategory.innerHTML +=
        `
                                    <div class="body__menu__item" onclick="openShowFoodInfor(${i}, '${category}')">
                                        <a href="#" class="body__menu__item__icon">
                                            <img src="${listFood[category][i].poster}" alt="">
                                        </a>
                                        <p class="body__menu__item__title">
                                            ${listFood[category][i].name}
                                        </p>
                                    </div>
        ` 
    }
    
    if(role == 1){
        showByCategory.innerHTML +=  
        ` 
                                    <div class="body__menu__new-dish__btn" onclick="openNewFood('${category}')">
                                        <a href="#" class="body__new-dish__btn__icon">
                                            <img src="../images/plus.png" alt="">
                                        </a>
                                    </div>
        `
    }
}

window.openShowFoodInfor = function(index, category) {
    if(category == "combo") {
        showComboInfor(index, category);
    } else {
        showDishInfor(index, category);
    }
}

function showDishInfor(index, category) {
    bodyMenuShowDish.innerHTML =
    `
                        <h2>Dish information</h2>
                        <div class="show-combo__left">
                            <div class="show-combo__left__name">
                                Name
                                <p class="show-combo__text">${listFood[category][index].name}</p>
                            </div>
                            <div class="show-combo__left__description">
                                Description
                                <p class="show-combo__text">${listFood[category][index].description}</p>
                            </div>
                            <div class="show-combo__left__category">
                                    Category
                                    <p class="show-combo__text">${category}</p>
                            </div>
                            <div class="show-combo__left__cost">
                                Cost
                                <p class="show-combo__text">${listFood[category][index].cost}</p>
                            </div>
                        </div>
                        <div class="show-combo__button">
                            <div class="show-combo__done-btn" onclick="closeShowFoodInfor()">
                                <a href="#" class="btn primary-btn">Done</a> 
                            </div>
                        </div>
    `
    if(role==1) {
        showComboBtn.innerHTML += 
        `
                            <div class="show-combo__delete-btn" onclick="handleDeleteDish('${category}', ${index})">
                                <a href="#" class="btn primary-btn">Delete</a> 
                            </div>
                            <div class="show-combo__edit-btn" onclick="handleEditFood('${category}', ${index})">
                                <a href="#" class="btn primary-btn">Edit</a> 
                            </div>
        `
    }
}

function showComboInfor(index, category) {
    bodyMenuShowCombo.innerHTML = 
    `
                        <h2>Combo information</h2>
                        <div class="show-combo__container">
                            <div class="show-combo__left">
                                <div class="show-combo__left__name">
                                    Name
                                    <p class="show-combo__text">${listFood[category][index].name}</p>
                                </div>
                                <div class="show-combo__left__description">
                                    Description
                                    <p class="show-combo__text">${listFood[category][index].description}</p>
                                </div>
                                <div class="show-combo__left__category">
                                    Category
                                    <p class="show-combo__text">${category}</p>
                                </div>
                                <div class="show-combo__left__cost">
                                    Cost
                                    <p class="show-combo__text">${listFood[category][index].cost}</p>
                                </div>
                            </div>
                            <div class="show-combo__right">
                                <div class="show-combo__right__list">
                                    <div class="show-combo__right__item">
                                        <img class="show-combo__right__item-image" src="../images/food-2.png" alt="">
                                        <span class="show-combo__right__item__name">Food 1</span>
                                        <span class="show-combo__right__item__quantity">x1</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="show-combo__button">
                            <div class="show-combo__done-btn" onclick="closeShowFoodInfor()">
                                <a href="#" class="btn primary-btn">Done</a> 
                            </div>
                        </div> 
    `

    const showComboBtn = document.getElementsByClassName("show-combo__button")[0];
    if(role==1) {
        showComboBtn.innerHTML += 
        `
                            <div class="show-combo__delete-btn" onclick="handleDeleteDish('${category}', ${index})">
                                <a href="#" class="btn primary-btn">Delete</a> 
                            </div>
                            <div class="show-combo__edit-btn" onclick="handleEditFood('${category}', ${index})">
                                <a href="#" class="btn primary-btn">Edit</a> 
                            </div>
        `
    }
    const showComboRightList = document.getElementsByClassName("show-combo__right__list")[0];
    showComboRightList.innerHTML = ``;
    const listDish = listFood[category][index]["dishInCombo"];
    for(let i = 0; i < listDish.length; i++) {
        if(!listDish[i].poster) {
            listDish[i].poster = "../images/food-2.png";
        }
        showComboRightList.innerHTML +=
        `
                                        <div class="show-combo__right__item">
                                            <img class="show-combo__right__item-image" src="${listDish[i].poster}" alt="">
                                            <span class="show-combo__right__item__name">${listDish[i].name}</span>
                                            <span class="show-combo__right__item__quantity">x${listDish[i].quantity}</span>
                                        </div>
        `
    }
}

window.closeShowFoodInfor = function() {
    bodyMenuShowCombo.innerHTML = ``;
    bodyMenuShowDish.innerHTML = ``;
}


window.openNewFood = function(category) {
    if(category == "combo") {
        openNewCombo(category);
    } else {
        openNewFood(category);
    }
}

function openNewCombo(category) {
    bodyMenuNewCombo.innerHTML = 
    `
                        <h2>New Combo</h2>
                        <div class="new-dish__container">
                            <div class="new-dish__left">
                                <div class="new-dish__left__name">
                                    Name
                                    <input 
                                        type="text" class="input-text"
                                        onclick="removeInvalidEffect('new-dish__left__name', 0)"
                                        onblur="handleGetInputName('new-dish__left__name', value)"
                                    >
                                    <div class="invalid__input-message">
                                    </div>
                                </div>
                                <div class="new-dish__left__description">
                                    Description
                                    <input 
                                        type="text" class="input-text"
                                        onclick="removeInvalidEffect('new-dish__left__description', 1)"
                                        onblur="handleGetInputDescription('new-dish__left__description', value)"
                                    >
                                    <div class="invalid__input-message">
                                    </div>
                                </div>
                                <div class="new-dish__left__cost">
                                    Cost
                                    <input 
                                        type="text" class="input-text"
                                        onclick="removeInvalidEffect('new-dish__left__cost', 2)"
                                        onblur="handleGetInputCost('new-dish__left__cost', value)"
                                    >
                                    <div class="invalid__input-message">
                                    </div>
                                </div>
                                <div class="new-dish__poster">
                                    <span>Poster</span>
                                    <label for="fileImage" class=" btn primary-btn new-dish__poster-label">Upload</label>
                                    <input type="file" id="fileImage" accept="image/png, image/jpeg" style='display:none'">
                                    <span class="new__event__poster-upload-preview"></span>
                                </div>
                            </div>
                            <div class="new-dish__right">
                                <div class="new-dish__right__list">
                                    <div class="new-dish__right__item">
                                        <img class="new-dish__right__item-image" src="../images/food-2.png" alt="">
                                        <span class="new-dish__right__item__name">Food 1</span>
                                        <div class="new-dish__right__item__quantity">
                                            <img src="../images/minus.png" alt="" class="decrease__icon">
                                            <span>0</span>
                                            <img src="../images/add.png" alt="" class="increase__icon">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="new-dish__button">
                            <div class="new-dish__create-btn" onclick="handleCreateNewDish('${category}')">
                                <a href="#" class="btn primary-btn">Create</a> 
                            </div>
                            <div class="new-dish__cancel-btn" onclick="closeNewFood()">
                                <a href="#" class="btn primary-btn">Cancel</a> 
                            </div>
                        </div>
    `
    

    //show dish on right part
    const newDishRightList = document.getElementsByClassName("new-dish__right__list")[0];
    newDishRightList.innerHTML = ``;
    for(let i = 0; i < listDishes.length; i++) {
        if(!listDishes[i].poster) {
            listDishes[i].poster = "../images/food-1.png"
        }
        newDish.dishInCombo[i] = {
            "id": listDishes[i].id,
            "quantity": 0
        }
        newDishRightList.innerHTML +=
        `
                                    <div class="new-dish__right__item">
                                        <img class="new-dish__right__item-image" src="${listDishes[i].poster}" alt="">
                                        <span class="new-dish__right__item__name">${listDishes[i].name}</span>
                                        <div class="new-dish__right__item__quantity">
                                            <img src="../images/minus.png" alt="" class="decrease__icon" onclick="decrease(${i})">
                                            <span class="new-combo__item__quantity-value">${newDish.dishInCombo[i].quantity}</span>
                                            <img src="../images/add.png" alt="" class="increase__icon" onclick="increase(${i})">
                                        </div>
                                    </div>
        `
    }
    

    window.decrease = function(index) {
        newDish.dishInCombo[index].quantity = Math.max(newDish.dishInCombo[index].quantity-1, 0);
        const newComboItemQuantityValue = newDishRightList.getElementsByClassName("new-combo__item__quantity-value")[index];
        newComboItemQuantityValue.innerHTML = newDish.dishInCombo[index].quantity;
    }

    window.increase = function(index) {
        newDish.dishInCombo[index].quantity = newDish.dishInCombo[index].quantity + 1;
        const newComboItemQuantityValue = newDishRightList.getElementsByClassName("new-combo__item__quantity-value")[index];
        newComboItemQuantityValue.innerHTML = newDish.dishInCombo[index].quantity;
    }

    //image processing
    const reader = new FileReader();
    const input = document.getElementById("fileImage");
    input.type = 'file';
    input.onchange = e => {
        poster = e.target.files;
        reader.readAsDataURL(poster[0]);
        const preview = document.getElementsByClassName("new__event__poster-upload-preview")[0];
        preview.innerHTML = "Loading";
        uploadImage(getImageName());
    }
}


function openNewFood(category) {
    bodyMenuNewDish.innerHTML = 
    `
                        <h2>New Dish</h2>
                        <div class="new-dish__container">
                            <div class="new-dish__left">
                                <div class="new-dish__left__name">
                                    Name
                                    <input 
                                        type="text" class="input-text"
                                        onblur="handleGetInputName('new-dish__left__name', value)"
                                        onclick="removeInvalidEffect('new-dish__left__name', 0)" 
                                    >
                                    <div class="invalid__input-message">
                                    </div>
                                </div>
                                <div class="new-dish__left__description">
                                    Description
                                    <input 
                                        type="text" class="input-text"
                                        onclick="removeInvalidEffect('new-dish__left__description', 1)"
                                        onblur="handleGetInputDescription('new-dish__left__description', value)"
                                    >
                                    <div class="invalid__input-message">
                                    </div>
                                </div>
                                <div class="new-dish__left__cost">
                                    Cost
                                    <input 
                                        type="text" class="input-text"
                                        onclick="removeInvalidEffect('new-dish__left__cost', 2)"
                                        onblur="handleGetInputCost('new-dish__left__cost', value)"
                                    >
                                    <div class="invalid__input-message">
                                    </div>
                                </div>
                                <div class="new-dish__poster">
                                    <span>Poster</span>
                                    <label for="fileImage" class=" btn primary-btn new-dish__poster-label">Upload</label>
                                    <input type="file" id="fileImage" accept="image/png, image/jpeg" style='display:none'">
                                    <span class="new__event__poster-upload-preview"></span>
                                </div>
                            </div>
                        </div>
                        <div class="new-dish__button">
                            <div class="new-dish__create-btn" onclick="handleCreateNewDish('${category}')">
                                <a href="#" class="btn primary-btn">Create</a> 
                            </div>
                            <div class="new-dish__cancel-btn" onclick="closeNewFood()">
                                <a href="#" class="btn primary-btn">Cancel</a> 
                            </div>
                        </div> 
    `

    //image processing
    const reader = new FileReader();
    const input = document.getElementById("fileImage");
    input.type = 'file';
    input.onchange = e => {
        poster = e.target.files;
        reader.readAsDataURL(poster[0]);
        const preview = document.getElementsByClassName("new__event__poster-upload-preview")[0];
        preview.innerHTML = "Loading";
        uploadImage(getImageName());
    }
}

window.closeNewFood = function() {
    bodyMenuNewCombo.innerHTML = ``;
    bodyMenuNewDish.innerHTML = ``;
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
    let invalidBorder = document.getElementsByClassName("input-text")[index];
    invalidBorder.classList.add("invalid__input-border");

    let invalidMessage = document.getElementsByClassName(validPath)[0].getElementsByClassName("invalid__input-message")[0];
    invalidMessage.innerHTML = getInvalidMessage(message);
}

window.removeInvalidEffect = function (path, index) {
    let containerInput = document.getElementsByClassName(path)[0];
    let invalidMessage = containerInput.getElementsByClassName("invalid__input-message")[0];
    invalidMessage.innerHTML = ``

    let invalidBorder = document.getElementsByClassName("input-text")[index];
    if(invalidBorder.classList.contains("invalid__input-border")) {
        invalidBorder.classList.remove("invalid__input-border")
    }
}


// get input data
window.handleGetInputName = function (elementPath, name) {
    if(name) {
        newDish.name = name;
    } else {
        handleInvalidEffect(elementPath, 0, 'Enter a name');
    }
}

window.handleGetInputDescription = function(elementPath, description) {
    if(description) {
        newDish.description = description;
    } else {
        handleInvalidEffect(elementPath, 1, 'Enter a description');
    }
}

window.handleGetInputCost = function(elementPath, cost) {
    if(cost) {
        if(isNaN(cost)) {
            handleInvalidEffect(elementPath, 2, 'Cost must be a number');
        } else {
            if(cost <= 0) {
                handleInvalidEffect(elementPath, 2, 'Cost must be greater than zero');
            } else {
                newDish.cost = parseFloat(cost);
            }
        }
    } else {
        handleInvalidEffect(elementPath, 2, 'Enter a cost');
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
                newDish.poster = url;
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


function validDishInCombo() {
    for(let i = 0; i < newDish.dishInCombo.length; i++) {
        if(newDish.dishInCombo[i].quantity == 0) {
            newDish.dishInCombo.splice(i, 1);
            validDishInCombo();
            return;
        }
    }
}

window.handleCreateNewDish = function(category) {
    newDish.catagory = categoryIndex[category];
    validDishInCombo();

    var isValid = true;

    if(!newDish.name) {
        handleGetInputName('new-dish__left__name');
        isValid = false;
    }

    if(!newDish.description) {
        handleGetInputDescription('new-dish__left__description');
        isValid = false;
    }

    if(!newDish.cost) {
        handleGetInputCost('new-dish__left__cost');
        isValid = false;
    }

    if(isValid) {
        var options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(newDish)
        };
        fetch(menuAPI, options) 
            .then(function(response) {
                response.json();
            })
            .then(function() {
                poster = [];
                listFood = [];
                listDishes = [];
                newDish = 
                {
                    "cost": null,
                    "name": null,
                    "description": null,
                    "poster": null,
                    "catagory": null,
                    "dishInCombo": []
                }
                closeNewFood();
                start();
            });
    } 
}

window.handleDeleteDish = function(category, index) {
    console.log("json", listFood[category][index]);
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(listFood[category][index])
    };
    fetch(GETmenuAPI, options) 
            .then(function(response) {
                //response.json();
            })
            .then(function() {
                closeShowFoodInfor();
                poster = [];
                listFood = [];
                listDishes = [];
                newDish = 
                {
                    "cost": null,
                    "name": null,
                    "description": null,
                    "poster": null,
                    "catagory": null,
                    "dishInCombo": []
                }
                start();
            });
}

window.handleEditFood = function(category, index) {
    if(category=="combo") {
        hanldeEditCombo(category, index);
    } else {
        handleEditDish(category, index);
    }
}

function hanldeEditCombo(category, index) {
    closeShowFoodInfor();

    newDish.id = listFood[category][index].id;
    newDish.name = listFood[category][index].name;
    newDish.description = listFood[category][index].description;
    newDish.cost = listFood[category][index].cost;
    newDish.poster = listFood[category][index].poster;
    newDish.catagory = listFood[category][index].catagory;

    bodyMenuNewCombo.innerHTML = 
    `
                        <h2>Edit Combo</h2>
                        <div class="new-dish__container">
                            <div class="new-dish__left">
                                <div class="new-dish__left__name">
                                    Name
                                    <input 
                                        type="text" class="input-text"
                                        value = "${newDish.name}"
                                        onclick="removeInvalidEffect('new-dish__left__name', 0)"
                                        onblur="handleGetInputName('new-dish__left__name', value)"
                                    >
                                    <div class="invalid__input-message">
                                    </div>
                                </div>
                                <div class="new-dish__left__description">
                                    Description
                                    <input 
                                        type="text" class="input-text"
                                        value = "${newDish.description}"
                                        onclick="removeInvalidEffect('new-dish__left__description', 1)"
                                        onblur="handleGetInputDescription('new-dish__left__description', value)"
                                    >
                                    <div class="invalid__input-message">
                                    </div>
                                </div>
                                <div class="new-dish__left__cost">
                                    Cost
                                    <input 
                                        type="text" class="input-text"
                                        value = "${newDish.cost}"
                                        onclick="removeInvalidEffect('new-dish__left__cost', 2)"
                                        onblur="handleGetInputCost('new-dish__left__cost', value)"
                                    >
                                    <div class="invalid__input-message">
                                    </div>
                                </div>
                                <div class="new-dish__poster">
                                    <span>Poster</span>
                                    <label for="fileImage" class=" btn primary-btn new-dish__poster-label">Upload</label>
                                    <input type="file" id="fileImage" accept="image/png, image/jpeg" style='display:none'">
                                    <span class="new__event__poster-upload-preview"></span>
                                </div>
                            </div>
                            <div class="new-dish__right">
                                <div class="new-dish__right__list">
                                    <div class="new-dish__right__item">
                                        <img class="new-dish__right__item-image" src="../images/food-2.png" alt="">
                                        <span class="new-dish__right__item__name">Food 1</span>
                                        <div class="new-dish__right__item__quantity">
                                            <img src="../images/minus.png" alt="" class="decrease__icon">
                                            <span>0</span>
                                            <img src="../images/add.png" alt="" class="increase__icon">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="new-dish__button">
                            <div class="new-dish__create-btn" onclick="handleUpdateFood()">
                                <a href="#" class="btn primary-btn">Apply</a> 
                            </div>
                            <div class="new-dish__cancel-btn" onclick="closeNewFood()">
                                <a href="#" class="btn primary-btn">Cancel</a> 
                            </div>
                        </div>
    `

    //show dish on right part
    const newDishRightList = document.getElementsByClassName("new-dish__right__list")[0];
    newDishRightList.innerHTML = ``;
    const listDishInCombo = listFood[category][index].dishInCombo;
    newDish.dishInCombo = listDishes;
    for(let i = 0; i < newDish.dishInCombo.length; i++) {
        for(let j = 0; j < listDishInCombo.length; j++) {
            if(newDish.dishInCombo[i].id == listDishInCombo[j].id) {
                newDish.dishInCombo[i].quantity = listDishInCombo[j].quantity;
            } else {
                newDish.dishInCombo[i].quantity = Math.max(0, newDish.dishInCombo[i].quantity);
            }
        }
    }
    for(let i = 0; i < listDishes.length; i++) {
        if(!listDishes[i].poster) {
            listDishes[i].poster = "../images/food-1.png"
        }
        newDishRightList.innerHTML +=
        `
                                    <div class="new-dish__right__item">
                                        <img class="new-dish__right__item-image" src="${listDishes[i].poster}" alt="">
                                        <span class="new-dish__right__item__name">${listDishes[i].name}</span>
                                        <div class="new-dish__right__item__quantity">
                                            <img src="../images/minus.png" alt="" class="decrease__icon" onclick="decrease(${i})">
                                            <span class="new-combo__item__quantity-value">${newDish.dishInCombo[i].quantity}</span>
                                            <img src="../images/add.png" alt="" class="increase__icon" onclick="increase(${i})">
                                        </div>
                                    </div>
        `
    }
    

    window.decrease = function(index) {
        newDish.dishInCombo[index].quantity = Math.max(newDish.dishInCombo[index].quantity-1, 0);
        const newComboItemQuantityValue = newDishRightList.getElementsByClassName("new-combo__item__quantity-value")[index];
        newComboItemQuantityValue.innerHTML = newDish.dishInCombo[index].quantity;
    }

    window.increase = function(index) {
        newDish.dishInCombo[index].quantity = newDish.dishInCombo[index].quantity + 1;
        const newComboItemQuantityValue = newDishRightList.getElementsByClassName("new-combo__item__quantity-value")[index];
        newComboItemQuantityValue.innerHTML = newDish.dishInCombo[index].quantity;
    }

    //image processing
    const reader = new FileReader();
    const input = document.getElementById("fileImage");
    input.type = 'file';
    input.onchange = e => {
        poster = e.target.files;
        reader.readAsDataURL(poster[0]);
        const preview = document.getElementsByClassName("new__event__poster-upload-preview")[0];
        preview.innerHTML = "Loading";
        uploadImage(getImageName());
    }
}

function handleEditDish(category, index) {
    closeShowFoodInfor();

    newDish.id = listFood[category][index].id;
    newDish.name = listFood[category][index].name;
    newDish.description = listFood[category][index].description;
    newDish.cost = listFood[category][index].cost;
    newDish.poster = listFood[category][index].poster;
    newDish.catagory = listFood[category][index].catagory;

    bodyMenuNewDish.innerHTML = 
    `
                        <h2>New Dish</h2>
                        <div class="new-dish__container">
                            <div class="new-dish__left">
                                <div class="new-dish__left__name">
                                    Name
                                    <input 
                                        type="text" class="input-text"
                                        value="${newDish.name}"
                                        onblur="handleGetInputName('new-dish__left__name', value)"
                                        onclick="removeInvalidEffect('new-dish__left__name', 0)" 
                                    >
                                    <div class="invalid__input-message">
                                    </div>
                                </div>
                                <div class="new-dish__left__description">
                                    Description
                                    <input 
                                        type="text" class="input-text"
                                        value="${newDish.description}"
                                        onclick="removeInvalidEffect('new-dish__left__description', 1)"
                                        onblur="handleGetInputDescription('new-dish__left__description', value)"
                                    >
                                    <div class="invalid__input-message">
                                    </div>
                                </div>
                                <div class="new-dish__left__cost">
                                    Cost
                                    <input 
                                        type="text" class="input-text"
                                        value="${newDish.cost}"
                                        onclick="removeInvalidEffect('new-dish__left__cost', 2)"
                                        onblur="handleGetInputCost('new-dish__left__cost', value)"
                                    >
                                    <div class="invalid__input-message">
                                    </div>
                                </div>
                                <div class="new-dish__poster">
                                    <span>Poster</span>
                                    <label for="fileImage" class=" btn primary-btn new-dish__poster-label">Upload</label>
                                    <input type="file" id="fileImage" accept="image/png, image/jpeg" style='display:none'">
                                    <span class="new__event__poster-upload-preview"></span>
                                </div>
                            </div>
                        </div>
                        <div class="new-dish__button">
                            <div class="new-dish__create-btn" onclick="handleUpdateFood()">
                                <a href="#" class="btn primary-btn">Apply</a> 
                            </div>
                            <div class="new-dish__cancel-btn" onclick="closeNewFood()">
                                <a href="#" class="btn primary-btn">Cancel</a> 
                            </div>
                        </div> 
    `

    //image processing
    const reader = new FileReader();
    const input = document.getElementById("fileImage");
    input.type = 'file';
    input.onchange = e => {
        poster = e.target.files;
        reader.readAsDataURL(poster[0]);
        const preview = document.getElementsByClassName("new__event__poster-upload-preview")[0];
        preview.innerHTML = "Loading";
        uploadImage(getImageName());
    }
}

window.handleUpdateFood = function() {
    validDishInCombo();

    var isValid = true;

    if(!newDish.name) {
        handleGetInputName('new-dish__left__name');
        isValid = false;
    }

    if(!newDish.description) {
        handleGetInputDescription('new-dish__left__description');
        isValid = false;
    }

    if(!newDish.cost) {
        handleGetInputCost('new-dish__left__cost');
        isValid = false;
    }

    if(isValid) {
        var options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(newDish)
        };
        fetch(menuAPI, options) 
            .then(function(response) {
                response.json();
            })
            .then(function() {
                poster = [];
                listFood = [];
                listDishes = [];
                newDish = 
                {
                    "cost": null,
                    "name": null,
                    "description": null,
                    "poster": null,
                    "catagory": null,
                    "dishInCombo": []
                }
                closeNewFood();
                start();
            });
    } 
}

