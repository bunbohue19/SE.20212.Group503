// api: http:localhost:8081/order -> GET: get list bill

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const creat_btn = $(".create-btn");
const new_modal = $('.new');
var OrderOutput;
// render bill-list
//api: http:localhost:8081/order
const list_order_api = "http://localhost:3000/OrderOutput"
//http://localhost:3000/OrderOutput
function get_orders(callback) {
    fetch(list_order_api)
        .then(function (response) {
            return response.json();
        })
        .then(callback)
}

function render_orders(orders){
    OrderOutput = orders;
    const order_list = $(".customer-list");
    let html = orders.map(function (order, index) {
        index ++;
        let table = order.tables.map(function (table) {
            return table.tableName;
        });
        return `
            <tr class="customer ${order.orderID}">
                <td >${index}</td>
                <td>${order.orderID}</td>
                <td>${order.customerName}</td>
                <td>${table.join(' | ')}</td>
                <td>${order.totalPay}</td>
                <td>Waiting</td>
            </tr>
        `;
    });
    order_list.innerHTML = html.join('');
}
const thePromise = new Promise((resolve, reject) => {
    // unnecessary
    setTimeout(() => {
        resolve('foo');
    }, 100);
});

thePromise
    .then(get_orders(render_orders))
    .then(orderDetails);

//show order details

function render_information_detail(infor_details,customer){
    let order_id = customer.classList[1];
    let order_detail = OrderOutput.find(function (order_output) {
        return order_output.orderID == order_id;
    }, order_id);
    let table = order_detail.tables.map(function (table) {
        return table.tableName;
    });
    let html = `
            <h2>Information</h2>
            <div class="bill-infor">
                <h3>ID:</h3>
                <span>${order_detail.orderID}</span>
            </div>
            <div class="bill-infor">
                <h3>Name:</h3>
                <span>${order_detail.customerName}</span>
            </div>
            <div class="bill-infor">
                <h3>Phone:</h3>
                <span>${order_detail.phone}</span>
            </div>
            <div class="bill-infor">
                <h3>Seat:</h3>
                <span>${table}</span>
            </div>
            <div class="bill-infor">
                <h3>Total:</h3>
                <span>${order_detail.totalPay}$</span>
            </div>
            <div class="bill-infor">
                <h3>Reserved time:</h3>
                <span>${order_detail.reservedTime}</span>
            </div>
            <div class="bill-infor">
                <h3>Status:</h3>
                <span>Waiting</span>
            </div>
            `
    infor_details.innerHTML = html;
}


var select_dishes, select_combos;
function orderDetails(){
    let customer_list = document.querySelectorAll(".customer");
    const infor_details = $('.infor-details');
    customer_list.forEach(function (customer) {

        

        customer.onclick = function () {
            render_information_detail(infor_details, customer);
            let bill_id = customer.classList[1];
            // display bill infor
            const bill = $('.bill_detail_infor');
            bill.classList.add('active');
            creat_btn.classList.add('hidden');
            const done_btn = $('.done-btn');
            const modify_btn = $('.modify-btn');
            
            
            // render select/delete dishes
            current_customer = OrderOutput.find(function (order) {
                return order.orderID == bill_id;
            }, bill_id)  //dishes selected by this customer
            select_dishes = current_customer.dishes;
            select_combos = current_customer.combo;
            // show selected dish and combo
            showSelectedItem();
            // show dishes to select
            const list_order_api = "http://localhost:8080/dishes";//api to get dishes
            getDishes(list_order_api, handleSelectDish);

            modify_btn.onclick = function () {
                bill.classList.remove('active');
                const dish_select_btn = $('.dish-select');
                dish_select_btn.classList.add("active");

                

                
                // handle select or delete dishes

                $('.dish-select__btn-done').onclick = function () {
                    bill.classList.add('active');
                    dish_select_btn.classList.remove("active");
                }
            }

            done_btn.onclick = function () {
                bill.classList.remove('active');
                creat_btn.classList.remove('hidden');
                infor_details.innerHTML = '';
            }
        }
    })
}

//http://localhost:8080/Dishes

function getDishes(list_order_api, callback){
    fetch(list_order_api)
        .then(function (response) {
            return response.json();
        })
        .then(callback)
}


function showSelectedItem(){
    const dish_list = $('.dish-list');
    let html = select_combos.map(function (select_combo) {
        return `
            <ul class="dish-select__list ${select_combo.comboID}">
                <li class="dish-select__item combo">
                    <div class = 'dish-select__item-img__combo'>
                        <img src="${select_combo.img_url}" alt="">
                    </div>
                    <div class="dish-select__item-content">

                        <div class="dish_name">${select_combo.comboName}</div>
                        <div class="dish_category">Quantity:<span>${select_combo.quantity}</span></spanb></div>
                        <div class="dish_cost">Cost: <span>${select_combo.comboPrice * select_combo.quantity}$</span></div>
                    </div>

                </li>
            </ul>
        `;
    });
    let html1 = select_dishes.map(function (select_dish) {
        return `
            <ul class="dish-select__list ${select_dish.dishID}">
                <li class="dish-select__item">
                    <div class = 'dish-select__item-img'>
                        <img src="${select_dish.img_url}" alt="">
                    </div>
                    <div class="dish-select__item-content">
                        <div class="dish_name">${select_dish.dishName}</div>
                        <div class="dish_category">Quantity: <span>${select_dish.quantity}</span></div>
                        <div class="dish_cost">Cost: <span>${select_dish.cost * select_dish.quantity}$</span></div>
                    </div>

                </li>
            </ul>
        `;
    });
    html = html.concat(html1);
    // console.log(html.join(''));
    dish_list.innerHTML = html.join('');
}
function handleSelectDish(dishes){
    console.log(dishes);
    const dishes_select_menu = $(".dish-select__body");
    console.log(dishes_select_menu);
    console.log(select_combos);
    let html = select_combos.map(function (select_combo) {
        return `
            <ul class="dish-select__list ${select_combo.comboID}">
                <li class="dish-select__item combo">
                    <div class = 'dish-select__item-img__combo'>
                        <img src="${select_combo.img_url}" alt="">
                    </div>
                    <div class="dish-select__item-content">

                        <div class="dish_name">${select_combo.comboName}</div>
                        <div class="dish_des">${select_combo.description}</div>
                        <div class="dish_cost">Cost: <span>${select_combo.comboPrice * select_combo.quantity}$</span></div>
                        
                        <div class = "select-quantity">
                            <input type="text" class="selected-dish" id="selected-quatity" value= "${select_combo.quantity}"></input>
                            <label class="form-input-label" for="selected-qantity" ></label>
                        </div>
                        <input type="checkbox" class="selected-dish" id="selected-dish-checkbox" checked>
                        <label class="form-check-label" for="selected-dish-checkbox"></label>
                    </div>

                </li>
            </ul>
        `;
    });
    let html1 = select_dishes.map(function (select_dish) {
        return `
            <ul class="dish-select__list ${select_dish.dishID}">
                <li class="dish-select__item">
                    <div class = 'dish-select__item-img'>
                        <img src="${select_dish.img_url}" alt="">
                    </div>
                    <div class="dish-select__item-content">
                        <div class="dish_name">${select_dish.dishName}</div>
                        <div class="dish_des">${select_dish.description}</div>
                        <div class="dish_category">${select_dish.category}</div>
                        <div class="dish_cost">Cost: <span>${select_dish.cost}$</span></div>

                        <div class = "select-quantity">
                            <input type="text" class="selected-dish" id="selected-quatity" value= "${select_dish.quantity}"></input>
                            <label class="form-input-label" for="selected-qantity" ></label>
                        </div>

                        <input type="checkbox" class="selected-dish" id="selected-dish-checkbox" checked>
                        <label class="form-check-label" for="selected-dish-checkbox"></label>
                    </div>

                </li>
            </ul>
        `;
    });

    let html2 = dishes.map(function (dish) {
        if (select_dishes.find(function (slt_dish) {
            return slt_dish.dishID == dish.dishID;
        }) == undefined){
            return `
            <ul class="dish-select__list ${dish.dishID}">
                <li class="dish-select__item">
                    <div class = 'dish-select__item-img'>
                        <img src="${dish.img_url}" alt="">
                    </div>
                    <div class="dish-select__item-content">
                        <div class="dish_name">${dish.dishName}</div>
                        <div class="dish_des">${dish.description}</div>
                        <div class="dish_category">${dish.category}</div>
                        <div class="dish_cost">Cost: <span>${dish.cost}$</span></div>

                        <div class = "select-quantity">
                            <input type="text" class="selected-dish" id="selected-quatity" value= "0"></input>
                            <label class="form-input-label" for="selected-qantity" ></label>
                        </div>

                        <input type="checkbox" class="selected-dish" id="selected-dish-checkbox">
                        <label class="form-check-label" for="selected-dish-checkbox"></label>
                    </div>

                </li>
            </ul>
        `;
        }
        
    });
    html = html.concat(html1.concat(html2));
    dishes_select_menu.innerHTML = html.join('');
}





function openNewModal() {
    new_modal.classList.add('active');

    creat_btn.classList.add('hidden');
}

function hideNewModal() {
    new_modal.classList.remove('active');
    creat_btn.classList.remove('hidden');
}

const create_order_API = "http:localhost:8081/order/create";

function createOrder(data, callback) {
    let option = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }
    fetch(create_order_API, option)
        .then(response => response.json())
        .then(callback)
}

function handleCreatBill(){
    let input_name = $('#input-name');
    let input_phone = $('#input-phone');
    let new_bill = {
        customerName: input_name.value,
        phone: input_phone.value,
        tableId: [1, 2],
        dishes: [3, 4]
    }
    input_name.value = '';
    input_phone.value = '';
    createOrder(new_bill, hideNewModal());
}

creat_btn.onclick = function(){
    openNewModal();
    const done_btn = $(".new__done-btn");

    done_btn.onclick = handleCreatBill();

    const cancel_btn = $(".new__cancel-btn");
    cancel_btn.onclick = function(){
        hideNewModal();
        
    };
};





