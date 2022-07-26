var dishAPI = "http://localhost:8081/Dish";
const list_order_api = "http://localhost:8081/order"


function getDishes(list_order_api, callback){
    fetch(list_order_api)
        .then(function (response) {
            return response.json();
        })
        .then(callback)
}

function getMaxDishes(){
    
}