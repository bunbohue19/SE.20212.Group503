// open add event
const newEventBtn = document.getElementsByClassName("body__newEvent__btn")[0]
const newEventForm = document.querySelector(".body__newEvent")

const openNewEventForm = () => {
    var reset_input_values = document.getElementsByClassName("newEvent__input-text");
        for (var i = 0; i < reset_input_values.length; i++) {
        reset_input_values[i].value = '';
        }
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


var listEvent = [];
var l = [
    {
        eventID: 1,
        eventName: "stay hungry 1",
        description: "stay foolish",
        beginTime: "may",
        endTime: "september",
        sale: "20%"
    },{
        eventID: 1,
        eventName: "stay hungry 1",
        description: "stay foolish",
        beginTime: "may",
        endTime: "september",
        sale: "20%"
    },{
        eventID: 1,
        eventName: "stay hungry 1",
        description: "stay foolish",
        beginTime: "may",
        endTime: "september",
        sale: "20%"
    },{
        eventID: 1,
        eventName: "stay hungry 1",
        description: "stay foolish",
        beginTime: "may",
        endTime: "september",
        sale: "20%"
    },{
        eventID: 1,
        eventName: "stay hungry 1",
        description: "stay foolish",
        beginTime: "may",
        endTime: "september",
        sale: "20%"
    },{
        eventID: 1,
        eventName: "stay hungry 1",
        description: "stay foolish",
        beginTime: "may",
        endTime: "september",
        sale: "20%"
    }
]

var showEventAPI = "http://localhost:3000/showEvent";
const  eventItemList = document.getElementsByClassName("body__event__list")[0]
const eventItems = document.getElementsByClassName("body__event__item")
const closeInforPopup = document.getElementsByClassName("event__popup__done-btn")[0]
const inforPopup = document.getElementsByClassName("body__event__popup")[0]


fetch(showEventAPI)
    .then(function(response){
        return response.json();
    })
    .then(function(showEvent){
        listEvent = showEvent;
        handleShowEvent();
        handleShowEventInfor();
    });



function handleShowEvent(){
    console.log(listEvent);
    for(let event of listEvent){
        eventItemList.innerHTML += ` <div class="body__event__item">
                                    <p class="body__event__item__id">` + event.eventID + `</p>  
                                    <a href="#" class="body__event__item__icon">
                                        <img src="../images/event-weedings.png" alt="">
                                    </a>
                                    <p class="body__event__item__title">` 
                                        + event.eventName
                                    + `</p>
                                </div>`
    }

}



function handleShowEventInfor(){
    for(let event of eventItems){
        event.addEventListener('click', () => {
            inforPopup.style.display = 'block'
            console.log(event.firstElementChild.textContent);
            for(eventItem of listEvent){
                if(eventItem.eventID == event.firstElementChild.textContent){
                    eventInfor = document.getElementsByClassName("event__popup__infor")
                    eventInfor[0].innerHTML = eventItem.eventName
                    eventInfor[1].innerHTML = eventItem.description
                    eventInfor[2].innerHTML = eventItem.beginTime
                    eventInfor[3].innerHTML = eventItem.endTime
                    eventInfor[4].innerHTML = eventItem.sale
                }
            }
        })
    }
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



// test API
