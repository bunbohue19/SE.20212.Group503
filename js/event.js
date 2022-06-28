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

// event-infor-popup
