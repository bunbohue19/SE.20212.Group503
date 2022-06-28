// open add event
const newEventBtn = document.getElementsByClassName("body__newEvent__btn")[0]
const newEventForm = document.querySelector(".body__newEvent")

const openNewEventForm = () => {
    newEventForm.style.display = 'block'
}

newEventBtn.addEventListener('click', openNewEventForm);


// close add event
const closeEventBtn = document.getElementsByClassName("newEvent__popup__close-btn")[0]
const closeNewEventForm = () => {
    newEventForm.style.display = 'none'
}

closeEventBtn.addEventListener('click', closeNewEventForm);

// event-infor-popupf
const eventItems = document.getElementsByClassName("body__event__item")
const closeInforPopup = document.getElementsByClassName("event__popup__done-btn")[0]
const inforPopup = document.getElementsByClassName("body__event__popup")[0]

for(let i = 0; i < eventItems.length; i++){
    eventItems[i].addEventListener('click', () => {
        inforPopup.style.display = 'block'
        document.getElementsByClassName("event__popup__name")[0].innerHTML = "Name<p class='event__popup__infor'>thang</p>"
    })
}

closeInforPopup.addEventListener('click', () => {
    inforPopup.style.display = 'none'
})

// get data from form
var newEvent = {
    name: "",
    description: "",
    start: "",
    end: "",
    discount: "",
}

eventName = document.getElementsByClassName("newEvent__input-text")[0].oninput = function(e) {
    newEvent.name = e.target.value;
}

eventDescription = document.getElementsByClassName("newEvent__input-text")[1].oninput = function(e) {
    newEvent.description = e.target.value;
}

eventStartTime = document.getElementsByClassName("newEvent__input-text")[2].oninput = function(e) {
    newEvent.start = e.target.value;
}

eventEndTime = document.getElementsByClassName("newEvent__input-text")[3].oninput = function(e) {
    newEvent.end = e.target.value;
}

eventDiscount = document.getElementsByClassName("newEvent__input-text")[4].oninput = function(e) {
    newEvent.discount = e.target.value;
}

