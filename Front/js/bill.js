import {role} from './role.js';
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const creat_btn = $(".create-btn");
const new_modal = $('.new');
var OrderOutput;
// render bill-list
//api: http:localhost:8081/order
const list_order_api_all = "http://localhost:8081/order/all"
const list_order_api = "http://localhost:8081/order" // api to get orders
const list_dishes_api = "http://localhost:8081/menu/order";//api to get dishes and combos
const table_api = 'http://localhost:8081/table/free'; //api to get available tables
//http://localhost:3000/OrderOutput
function get_orders(callback) {
    if(role == 1){
        fetch(list_order_api_all)
            .then(function (response) {
                return response.json();
            })
            .then(callback)
    }else{
        fetch(list_order_api)
            .then(function (response) {
                return response.json();
            })
            .then(callback)
    }
}


function render_orders(orders){
    OrderOutput = orders;
    const order_list = $(".customer-list");
    let html = (orders == null) ? [""] : orders.map(function (order, index) {
        index ++;
        let table;
        if(order.tables == null){
            table = ['']
        }else{
            table = (order.tables).map(function (table) {
                return table.tableName;
            });
        }
        return `
            <tr class="customer ${order.orderID}">
                <td >${index}</td>
                <td>${order.orderID}</td>
                <td>${(order.phone == null) ? '' : order.phone}</td>
                <td>${table.join(', ')}</td>
                <td>${order.totalCost}$</td>
                <td>${order.status}</td>               
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
var select_dishes, select_tables, res_time, cus_phone, 
current_customer, current_bill, all_dishes_combos, total_pay = 0, total = 0;

function render_information_detail(infor_details,customer){
    let order_id = customer.classList[1];
    let order_detail = OrderOutput.find(function (order_output) {
        return order_output.orderID == order_id;
    }, order_id);
    let table;
    if (order_detail.tables == null) table = [''];
    else 
    {
        table = order_detail.tables.map(function (table) {
            return table.tableName;
        });
    }
    if (order_detail.status != 'booking'){
        $('.check-in_btn.btn-group').classList.add('hidden');
    }else{
        $('.check-in_btn.btn-group').classList.remove('hidden');
    }

    if (order_detail.status == 'paid' || order_detail.status == 'cancel'){
        $('.bill_detail_infor .delete-btn').classList.add('hidden');
        $('.bill_detail_infor .checkout-btn').classList.add('hidden');
        $('.bill_detail_infor .edit-btn').classList.add('hidden');
        $('.bill_detail_infor .save-btn').classList.add('hidden');
        $('.bill_detail_infor .modify-btn').classList.add('hidden');
        $('.bill_detail_infor .cancel-btn').style.marginLeft = '270px';
    }
    else{
        $('.bill_detail_infor .delete-btn').classList.remove('hidden');
        $('.bill_detail_infor .checkout-btn').classList.remove('hidden');
        $('.bill_detail_infor .edit-btn').classList.remove('hidden');
        $('.bill_detail_infor .save-btn').classList.remove('hidden');
        $('.bill_detail_infor .modify-btn').classList.remove('hidden');
        $('.bill_detail_infor .cancel-btn').style.marginLeft = '48px';
    }

    let html = `
            <h2>Information</h2>
            <div class="bill-infor">
                <h3>ID:</h3>
                <span>${order_detail.orderID}</span>
            </div>
            
            <div class="bill-infor">
                <h3>Phone:</h3>
                <span>${(order_detail.phone == null) ? "" : order_detail.phone}</span>
            </div>
            <div class="bill-infor">
                <h3>Seat:</h3>
                <span>${table.join(', ')}</span>
            </div>
            <div class="bill-infor">
                <h3>Total:</h3>
                <span>${order_detail.totalCost}$</span>
            </div>
            <div class="bill-infor">
                <h3>Reserved time:</h3>
                <span>${(order_detail.reservedTime == null) ? ' ' :  order_detail.reservedTime.slice(11, 16) + '   ' +order_detail.reservedTime.slice(8, 10) + '-' + order_detail.reservedTime.slice(5, 7) + '-' + order_detail.reservedTime.slice(0, 4) }</span>
            </div>
            <div class="bill-infor">
                <h3>Status:</h3>
                <span>${order_detail.status}</span>
            </div>
            <div class="input-eventID">
                <label for="input-event">Event: </label>
                <input type="text" id = "input-event"  placeholder = 'Event ID' value = ${(order_detail.eventId == null) ? '' : order_detail.eventId}>
            </div>
            <div class="input-eventID">
                <label for="input-paidPoint">Paid point: </label>
                <input type="text" id = "input-paidPoint"  placeholder = 'Paid point' value = ${(order_detail.paidPoint == null || order_detail.paidPoint == 0) ? '' : order_detail.paidPoint}>
            </div>
            `
    infor_details.innerHTML = html;
}

function showBillDetails(){
    $('.bill_detail_infor').classList.add('active');
    creat_btn.classList.add('hidden');
}

function hideBillDetails() {
    $('.bill_detail_infor').classList.remove('active');
    creat_btn.classList.remove('hidden');
}

function showSelecteMenu(){
    $('.bill.dish-select').classList.add('active');
    creat_btn.classList.add('hidden');
    $(".bill.bill_detail_infor").classList.remove('active');
}

function hideSelecteMenu() {
    $('.bill.dish-select').classList.remove('active');
    creat_btn.classList.remove('hidden');
    $(".bill.bill_detail_infor").classList.add('active');
}

//http://localhost:8080/Dishes

function getDishes(list_order_api, callback){
    fetch(list_order_api)
        .then(function (response) {
            return response.json();
        })
        .then(callback)
}

//show selected dishes and combos in order detail modal
function renderSelectedItem(){
    const dish_list = $('.dish-list');
    total = 0; //reset total
    if (select_dishes != null){
        
        let html = select_dishes.map(function (select_dish) {
            total += select_dish.cost * select_dish.quantity;
            return `
                <ul class="dish-select__list ${select_dish.id}">
                    <li class="dish-select__item">
                        <div class = 'dish-select__item-img'>
                            <img src="${select_dish.poster}" alt="">
                        </div>
                        <div class="dish-select__item-content">
                            <div class="dish_name">${select_dish.name}</div>
                            <div class="dish_category">Quantity: <span>${select_dish.quantity}</span></div>
                            <div class="dish_cost">Cost: <span>${select_dish.cost}$</span>
                            </div>
                        </div>
    
                    </li>
                </ul>
            `;
        });
        
        dish_list.innerHTML = html.join('');
        $$('.infor .infor-details .bill-infor')[3].querySelector('span').textContent = total.toFixed(2) + "$";
    }
    
}
//select dish menu
function renderSelectDishMenu(dishes_combos){
    all_dishes_combos = dishes_combos;
    let dishes = dishes_combos;
    const dishes_select_menu = $(".dish-select__body .dish-row");
    if (select_dishes == null){
        select_dishes = [];
    }
    let html1 = select_dishes.map(function (select_dish) {
        return `
            <div class="col-2">
                <ul class="dish-select__list">
                    <li class="dish-select__item dish ${select_dish.id}">
                        <div class = 'dish-select__item-img'>
                            <img src="${select_dish.poster}" alt="">
                            <div class="dish_name">${select_dish.name}</div>
                        </div>
                        <div class="dish-select__item-content">
                            <div class="discount-category">
                                <div class="dish_category">Category: ${select_dish.catagory}</div>
                            </div>
                            <div class="dish_cost">Cost: 
                                <span>${select_dish.cost}$</span>
                            </div>
                            <div class = "select-quantity">
                                <input type="text" class="selected-dish" id="selected-quatity" value= "${select_dish.quantity}"></input>
                                <label class="form-input-label" for="selected-qantity" ></label>
                            </div>
                            <div class = "selected_item_checkbox">
                                <input type="checkbox" class="selected-dish" id="selected-dish-checkbox" checked>
                                <label class="form-check-label" for="selected-dish-checkbox"></label>
                            </div>
                        </div>

                    </li>
                </ul>
            </div>
        `;
    });
    
    let html3 = dishes.map(function(dish) {
        if (select_dishes.find(function (slt_dish) {
            return slt_dish.id == dish.id;
        }) == undefined){
            return `
            <div class="col-2">
                <ul class="dish-select__list">
                    <li class="dish-select__item dish ${dish.id}">
                        <div class = 'dish-select__item-img'>
                            <img src="${dish.poster}" alt="">
                            <div class="dish_name">${dish.name}</div>
                        </div>
                        <div class="dish-select__item-content">
                            <div class="discount-category">
                                <div class="dish_category">Category: ${dish.catagory}</div>
                            </div>
                            <div class="dish_cost">Cost: 
                                <span>${dish.cost}$</span>
                            </div>

                            <div class = "select-quantity hidden">
                                <input type="text" class="selected-dish" id="selected-quatity" value= "0"></input>
                                <label class="form-input-label" for="selected-qantity" ></label>
                            </div>

                            <div class = "selected_item_checkbox">
                                <input type="checkbox" class="selected-dish" id="selected-dish-checkbox">
                                <label class="form-check-label" for="selected-dish-checkbox"></label>
                            </div>
                        </div>

                    </li>
            </ul>

            </div>
        `;
        }
        
    });
    let html = html1.concat(html3);
    dishes_select_menu.innerHTML = html.join('');
}

//hide or show input quatity when checkbox is clicked on
function hanedleCheckboxEvent(event){
    if (event.target.id == 'selected-dish-checkbox'){
        let check_box_quantity = event.target.parentNode.parentNode.parentNode;
        if (event.target.checked == true){
            check_box_quantity.querySelector('.select-quantity').classList.remove('hidden');
        }else{
            let tp = check_box_quantity.querySelector('.select-quantity');
            tp.querySelector("#selected-quatity").value = 0;
            tp.classList.add('hidden');
        }
    }
}

function handleSelectDishMenu() {
    let check_box_event = $('.dish-select__body .dish-row');
    check_box_event.onclick = function(event){
        hanedleCheckboxEvent(event);
    }
}

function handeleSubmitDoneSelectDish(){
    let new_dishes = [], new_combos = [];
    let selected_item_list = $$('.dish-select .dish-select__item');
    total_pay = 0; // reset total_pay
    selected_item_list.forEach(function(item){
        if (item.parentNode.querySelector('#selected-dish-checkbox').checked == true){
            let qt = item.parentNode.querySelector('#selected-quatity').value;
            let temp;
            
                temp = (all_dishes_combos).find(function (temp_item) {
                    return temp_item.id == item.classList[2];
                })
                if (parseInt(qt) != 0){
                    temp.quantity = parseInt(qt);
                    total_pay += temp.cost * temp.quantity;
                    new_dishes.push(temp);
                }

            
        }
    })
    select_dishes = new_dishes;
    renderSelectedItem();
    
}

function handleShowSelectDishMenu() {
    let prom = new Promise((resolve, reject) => {
        // unnecessary
        setTimeout(() => {
            resolve('foo');
        }, 100);
    });
    prom
        .then(getDishes(list_dishes_api, renderSelectDishMenu))
        .then(showSelecteMenu)
        .then(handleSelectDishMenu)
        .then(function () {
            $('.dish-select__btn-done').onclick = function(){
                handeleSubmitDoneSelectDish();
                hideSelecteMenu();
            };
            $('.dish-select__btn-cancel').onclick = hideSelecteMenu;
        })

}

function showEditModal() {
    $('.edit').classList.add('active');

    hideBillDetails();
}

function hideEditModal() {
    $('.edit').classList.remove('active');
    showBillDetails();
}

function showEditSelectTable() {
    hideEditModal();
    $('.bill.bill_detail_infor').classList.remove('active');

    $('.bill.edit-select-table').classList.add('active');
    let theProms = new Promise((resolve, reject) => {
        // unnecessary
        setTimeout(() => {
            resolve('foo');
        }, 100);
    });

    theProms
        .then(fetchTableMenuApi(renderEditSelectTable))
        .then(hanedleEditSelectTable);
}

function renderEditSelectTable(data){

    let select_table_container = $('.edit-select-table_container .row');
    if (select_tables == null) select_tables = [];
    let html_0 = select_tables.map(function (table) {
        return `
            <div class="col">
                <div class="edit-table_select ${table.tableID}">
                    <span>${table.tableName}</span>
                    <span>${table.numSeats} seats</span>
                    <img src="../images/table-img_bill.jpg" alt="">
                    <input type="checkbox" class="edit-selected-table" id="edit-selected-table-checkbox" checked>
                </div>
            </div>
        `
    })
    if(data == null) data = [];
    let html = data.map(function (table) {
        return `
            <div class="col">
                <div class="edit-table_select ${table.tableID}">
                    <span>${table.tableName}</span>
                    <span>${table.numSeats} seats</span>
                    <img src="../images/table-img_bill.jpg" alt="">
                    <input type="checkbox" class="edit-selected-table" id="edit-selected-table-checkbox">
                </div>
            </div>
        `
    })
    select_table_container.innerHTML = (html_0.concat(html)).join('');
    $$('.edit-table_select').forEach(function (table) {
        table.onclick = function () {
            let check_box = table.querySelector('#edit-selected-table-checkbox');
            if (check_box.checked == true) {
                check_box.checked = false;
            } else check_box.checked = true;
        }
    })

    $$('#edit-selected-table-checkbox').forEach(function (check_box) {
        check_box.onclick = function () {
            if (check_box.checked == true) {
                check_box.checked = false
            } else check_box.checked = true;
        }
    })
}

function hideEditSelectTable() {
    $('.bill.edit-select-table').classList.remove('active');
    showEditModal();
}

let tp_select_tables = [];
function hanedleEditSelectTable(){
    $('.edit-select-table__bnt-group .table__done-btn').onclick = function(){
        $$('.edit-table_select').forEach(function (table) {
            if (table.querySelector('#edit-selected-table-checkbox').checked == true) {
                tp_select_tables.push({
                    "numSeats": parseInt(table.querySelectorAll('span')[1].textContent),
                    "tableName": table.querySelectorAll('span')[0].textContent,
                    "status": "Available",
                    "tableID": parseInt(table.classList[1])
                });
            }
        })
        hideEditSelectTable();
    };

    $('.edit-select-table__bnt-group .table__cancel-btn').onclick = hideEditSelectTable;
}

function submitEditBill(){
    res_time = $('.edit #edit-input-name').value;
    cus_phone = $('.edit #edit-input-phone').value;
    select_tables = tp_select_tables;
    tp_select_tables = [];
    $$('.infor .infor-details .bill-infor')[4].querySelector('span').textContent = res_time;
    $$('.infor .infor-details .bill-infor')[1].querySelector('span').textContent = cus_phone;
    let selected_tables = select_tables.map(function (table){
        return table.tableName;
    })
    $$('.infor .infor-details .bill-infor')[2].querySelector('span').textContent = selected_tables.join(', ');
    hideEditModal();
}

function handleEditBill(){
    $('.edit #edit-input-name').value = res_time;
    $('.edit #edit-input-phone').value = cus_phone;
    showEditModal();
    $('#edit-select-btn').onclick = showEditSelectTable;
    $('.edit__done-btn').onclick = submitEditBill;
    $('.edit__cancel-btn').onclick = hideEditModal;
}

function updateBill(data, callback) {
    let option = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }
    fetch(list_order_api, option)
        // .then(response => response.json())
        .then(callback)
}

function saveUpdateBill(){
    current_customer.tables = select_tables;
    current_customer.reservedTime = res_time;
    current_customer.phone = cus_phone;
    current_customer.dishes = select_dishes;
    current_bill.querySelectorAll('td')[2].textContent = cus_phone;
    let selected_tables =[];
    if (select_tables == null){
        selected_tables = [''];
    }
    else {
            selected_tables = select_tables.map(function (table) {
            return table.tableName;
        })
    }
    current_bill.querySelectorAll('td')[3].textContent = selected_tables.join(', ');
    current_bill.querySelectorAll('td')[4].textContent = total.toFixed(2) + '$';
    let tp = {};
    tp.orderID = current_customer.orderID;
    tp.eventId = current_customer.eventId;
    tp.phone = current_customer.phone;
    tp.reservedTime = current_customer.reservedTime;
    tp.paidPoint = current_customer.paidPoint;
    tp.tables = current_customer.tables;
    tp.eventId = ($('#input-event').value == '') ? null : parseInt($('#input-event').value);
    tp.paidPoint = ($('#input-paidPoint').value == '') ? null : parseInt($('#input-paidPoint').value);
    console.log(tp.eventId);
    if (current_customer.dishes == null) tp.dishes =null;
    else
        tp.dishes = (current_customer.dishes).map(function(d){
            return {
                "quantity": d.quantity,
                'id': d.id
            }
        })
    let prom = new Promise((resolve, reject) => {
        // unnecessary
        setTimeout(() => {
            resolve('foo');
        }, 500);
    });
    prom
    .then(updateBill(tp, hideBillDetails))
    .then(get_orders(render_orders))
    .then(get_orders(render_orders))
    .then(get_orders(render_orders))
    .then(get_orders(render_orders))    
}

function renderPayment(){
    $$('.order__infor.billId span')[1].textContent = current_customer.orderID;
    $$('.order__infor.customerName span')[1].textContent = current_customer.phone;
    $$('.order__infor.seat span')[1].textContent = (current_customer.tables == null) ? "" :  ((current_customer.tables).map(function (table) {
        return table.tableName;
    })).join(', ');

    let table_body = $('.payment__table tbody');
    let totalPay = 0;
    

    let html2 = ((current_customer.dishes) == null) ? [""] : (current_customer.dishes).map(function (dish) {
        totalPay += dish.cost * dish.quantity;
        return `
            <tr>
                <td>${dish.name}</td>
                <td>${dish.quantity}</td>
                <td>${dish.cost}$</td>
            </tr>
        `
    })
    table_body.innerHTML = html2.join('');
    $$('.payment__des.paymentAmount span')[1].textContent = totalPay.toFixed(2) + "$";
    $$('.payment__des.paymentDiscount span')[0].textContent = `Discount(${current_customer.discount}%): `;
    $$('.payment__des.paymentDiscount span')[1].textContent = '-' + (totalPay * current_customer.discount / 100).toFixed(2) + "$";
    $$('.payment__des.totalPayment span')[1].textContent = (totalPay * (1 - current_customer.discount / 100) - current_customer.paidPoint).toFixed(2) + "$";
    $$('.payment__des.paidPointPay span')[1].textContent = '-' + current_customer.paidPoint + "$";
}

function sendCheckoutRequest(data, callback) {

    let option = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }
    fetch(list_order_api, option)
        // .then(response => response.json())
        .then(get_orders(render_orders))
        .then(callback)
}

function showPayment(){
    $('.payment').classList.add('active');
    $('.bill.bill_detail_infor').classList.remove('active');
}

function hidePayment() {
    $('.payment').classList.remove('active');
    $('.infor').classList.add('active');
}

function handleCheckout(){
    renderPayment();
    showPayment();
    $('.payment .pay-btn').onclick = function (){
        current_bill.querySelectorAll('td')[5].textContent = 'paid';
        console.log(current_customer);
        let dt = {
            "orderID": current_customer.orderID,
            "status": "paid"
        };
        sendCheckoutRequest(dt ,hidePayment())
  
    };
    $('.payment .payment__cancel-btn').onclick = hidePayment;
}

function handleDelete(){
    let option = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "orderID": current_customer.orderID,
            "status": "cancel"
        }
    ),
    }
    fetch(list_order_api, option)
        // .then(response => response.json())
        .then(hideBillDetails)
        .then(get_orders(render_orders))
        .then(get_orders(render_orders))
        .then(get_orders(render_orders))
        .then(get_orders(render_orders))

}

function handleCheckIn(){
    let option = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "orderID": current_customer.orderID,
            "status": "waiting"
        }
        ),
    }
    fetch(list_order_api, option)
        .then(hideBillDetails)
        .then(function (){
            current_bill.querySelectorAll('td')[5].textContent = 'waiting';
            current_customer.status = 'waiting';
            hideBillDetails();
        })
}

function orderDetails() {
    let customer_list = $('.customer-list');
    customer_list.onclick = function (event) {
        if (event.target.parentNode.classList[0] == 'customer') {
            current_bill = event.target.parentNode;
            let customer = event.target.parentNode;
            const infor_details = $('.infor-details');
            render_information_detail(infor_details, customer);
            let bill_id = customer.classList[1];
            // display bill infor
            showBillDetails();

            // render select/delete dishes
            current_customer = OrderOutput.find(function (order) {
                return order.orderID == bill_id;
            }, bill_id)  //dishes selected by this customer
            select_dishes = current_customer.dishes;
            // select_combos = current_customer.combos;
            select_tables = current_customer.tables;
            res_time = current_customer.reservedTime;
            cus_phone = current_customer.phone;
            // show selected dish and combo
            renderSelectedItem();

            //handle buttons

            // add/remove dishes button
            $('.bill_detail_infor .modify-btn').onclick = handleShowSelectDishMenu;
            // cancel button
            $('.bill_detail_infor .cancel-btn').onclick = hideBillDetails;

            // edit button
            $('.bill_detail_infor .edit-btn').onclick = handleEditBill;
            
            // save button
            $('.bill_detail_infor .save-btn').onclick = saveUpdateBill;

            // check out buttons
            $('.bill_detail_infor .checkout-btn').onclick = handleCheckout;

            // delete button

            $('.bill_detail_infor .delete-btn').onclick = function(){
                current_bill.querySelectorAll('td')[5].textContent = 'cancel';
                handleDelete();
            }

            $('.check-in_btn.btn-group').onclick = handleCheckIn;

        }
    }

}

//create new order
let phone = '', resTime = '';
function showNewModal() {
    $('.new #input-name').value = resTime;
    $('.new #input-phone').value = phone;
    new_modal.classList.add('active');

    creat_btn.classList.add('hidden');
}

function hideNewModal() {
    table_list = [];
    $('.new #input-name').value = '';
    $('.new #input-phone').value = '';
    new_modal.classList.remove('active');
    creat_btn.classList.remove('hidden');
}

function createOrder(data, callback) {
    let option = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }
    fetch(list_order_api, option)
        .then(callback)
        .then(get_orders(render_orders))
        .then(get_orders(render_orders))
        .then(get_orders(render_orders))
}

function handleCreatBill(table_list){
    resTime = $('#input-name').value;
    phone = $('#input-phone').value;
    let tab;
    if(table_list.length > 0){
        tab = table_list.map(function (t){
            return {
                "tableID": t
            }
        })
    }else tab = null
    let new_bill = {
        "reservedTime": (resTime == '') ? null : resTime,
        "phone": (phone == '') ? null : phone,
        "tables": tab,
    }
    resTime = '';
    phone = '';
    createOrder(new_bill, hideNewModal());
}

function showSelectTable(){
    resTime = $('#input-name').value;
    phone = $('#input-phone').value;
    $('.bill.select-table').classList.add('active');
    hideNewModal();
}

function hideSelectTable() {
    $('.bill.select-table').classList.remove('active');
    showNewModal();
}


var table_list = [];
function hadleDoneSelectTableMenu(){
    $$('.table_select').forEach(function(table){
        if (table.querySelector('#selected-table-checkbox').checked == true){
            table_list.push(parseInt(table.classList[1]));
        }
    })
    hideSelectTable();
}

function fetchTableMenuApi(callback) {
    fetch(table_api)
        .then(function (response) {
            return response.json();
        })
        .then(callback)
}

function genderTableMenu(data){
    let select_table_container =  $('.select-table_container .row');
    let html = data.map(function (table) {
        return `
            <div class="col">
                <div class="table_select ${table.tableID}">
                    <span>${table.tableName}</span>
                    <span>${table.numSeats} seats</span>
                    <img src="../images/table-img_bill.jpg" alt="">
                    <input type="checkbox" class="selected-table" id="selected-table-checkbox">
                </div>
            </div>
        `
    })

    select_table_container.innerHTML = html.join('');
    $$('.table_select').forEach(function(table){
        table.onclick = function(){
            let check_box = table.querySelector('#selected-table-checkbox');
            if(check_box.checked == true){
                check_box.checked = false;
            } else check_box.checked = true;
        }
    })

    $$('#selected-table-checkbox').forEach(function(check_box){
        check_box.onclick = function(){
            if(check_box.checked == true){ 
                check_box.checked = false
            }else check_box.checked = true;
        }
    })
}

function handleShowSelectTableMenu() {
    showSelectTable();
    $('.table-btn.table__done-btn').onclick = hadleDoneSelectTableMenu;
    $('.table-btn.table__cancel-btn').onclick = hideSelectTable;
}

function handleDoneCreatNewOrder(){
    let theProms = new Promise((resolve, reject) => {
        // unnecessary
        setTimeout(() => {
            resolve('foo');
        }, 100);
    });

    theProms
        .then(handleCreatBill(table_list))
        // .then(hideNewModal);
}

creat_btn.onclick = function(){
    showNewModal();
    const done_btn = $(".new .new__done-btn");

    done_btn.onclick = handleDoneCreatNewOrder;

    const cancel_btn = $(".new .new__cancel-btn");
    cancel_btn.onclick = function(){
        resTime = '';
        phone = '';
        hideNewModal()
    };

    const select_btn = $(".new #select-btn");
    select_btn.onclick = function(){
        let theProms = new Promise((resolve, reject) => {
            // unnecessary
            setTimeout(() => {
                resolve('foo');
            }, 100);
        });

        theProms
            .then(fetchTableMenuApi(genderTableMenu))
            .then(handleShowSelectTableMenu);
    };//handleShowSelectTableMenu
};





