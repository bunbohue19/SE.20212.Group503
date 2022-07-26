const tableApi = 'http://localhost:8081/table';
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

let all_html = [];
let available_html = [];
let reserved_html = [];
let occupied_html = [];
let out_of_order_html = [];
const btn_group = $$('.btn-group');
let tableList = [];
import { role } from './role.js';

function setRole() {
    var navRole = document.getElementsByClassName("nav__role")[0];
    if (role == 1) {
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
    } else if (role == 0) {
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

setRole();
function getTables(callback) {
    fetch(tableApi)
        .then(function (response) {
            return response.json();
        })
        .then(callback)
}

function renderHTML(data){
    tableList = data;
    data.forEach(function(seat){
        all_html.push(
            `
                <div class="col">
                    <div class="table ${seat.tableID}">
                        <div class="table__header">
                            <span>${seat.tableName}</span>
                            <div class="table__status" style = "background-color: var(--${seat.status}"></div>
                        </div>
                        <div class="table__body">
                            <img class='table__img' src="../images/table-img_bill.jpg" alt="">
                        </div>
                    </div>
                </div>
            `
        )
        if(seat.status === 'free'){
            available_html.push(
                `
                    <div class="col">
                        <div class="table ${seat.tableID}">
                            <div class="table__header">
                                <span>${seat.tableName}</span>
                                <div class="table__status" style = "background-color: var(--${seat.status}"></div>
                            </div>
                            <div class="table__body">
                                <img class='table__img' src="../images/table-img_bill.jpg" alt="">
                            </div>
                        </div>
                    </div>
                `
            )
        }else{
            if(seat.status === 'booking'){
                reserved_html.push(
                    `
                        <div class="col">
                            <div class="table ${seat.tableID}">
                                <div class="table__header">
                                    <span>${seat.tableName}</span>
                                    <div class="table__status" style = "background-color: var(--${seat.status}"></div>
                                </div>
                                <div class="table__body">
                                    <img class='table__img' src="../images/table-img_bill.jpg" alt="">
                                </div>
                            </div>
                        </div>
                    `
                )
            }else{
                if(seat.status === 'busy'){
                    occupied_html.push(
                        `
                            <div class="col">
                                <div class="table ${seat.tableID}">
                                    <div class="table__header">
                                        <span>${seat.tableName}</span>
                                        <div class="table__status" style = "background-color: var(--${seat.status}"></div>
                                    </div>
                                    <div class="table__body">
                                        <img class='table__img' src="../images/table-img_bill.jpg" alt="">
                                    </div>
                                </div>
                            </div>
                        `
                    )
                }else{
                    out_of_order_html.push(
                        `
                            <div class="col">
                                <div class="table ${seat.tableID}">
                                    <div class="table__header">
                                        <span>${seat.tableName}</span>
                                        <div class="table__status" style = "background-color: var(--${seat.status}"></div>
                                    </div>
                                    <div class="table__body">
                                        <img class='table__img' src="../images/table-img_bill.jpg" alt="">
                                    </div>
                                </div>
                            </div>
                        `
                    )
                }
            }
        }
    })
    $('.seat__all').innerHTML = all_html.join("");
    $('.seat__available').innerHTML = available_html.join("");
    $('.seat__reserved').innerHTML = reserved_html.join("");
    $('.seat__occupied').innerHTML = occupied_html.join("");
    $('.seat__out_of_order').innerHTML = out_of_order_html.join("");
    all_html = [];
    available_html = [];
    reserved_html = [];
    occupied_html = [];
    out_of_order_html = [];
}

function start() {
    getTables(renderHTML);
}
start();

// content header button click
btn_group.forEach(function (btn) {
    btn.onclick = function () {
        $('.btn-group.btn--active').classList.remove('btn--active');
        btn.classList.add('btn--active');
        const target = btn.classList[1];
        $('.active').classList.remove('active');
        const table_list_to_display = $(`.seat__${target}`);
        table_list_to_display.classList.add('active');
    }
})

// menu button click
const btns = $$('.btn');
btns.forEach(function(btn){
    btn.onclick = function(){
        console.log($('.btn.btn--active'));
        $('.btn.btn--active').classList.remove('btn--active');
        
        btn.classList.add('btn--active');
    }
})

//display table infor when click
const tables = $$('.table');
tables.forEach(function (table) {
    table.onclick = function () {
        
    }
});

//add new table 

const add_new_table_btn = $('.add-btn');

function showNewModal(){
    add_new_table_btn.classList.remove('active');
    $('.new').classList.add('active');
}

function hideNewModal(){
    add_new_table_btn.classList.add('active');
    $('.new').classList.remove('active');
}

function submitCreatNewTable(callback){
    
    let data = {
        "numSeats": parseInt($('#input-seats').value),
        "tableName": $('#input-name').value
    }

    let option = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }
    fetch(tableApi, option)
    .then(callback)   
    .then(start)
}

add_new_table_btn.onclick = function(){
    showNewModal();
    $('.new_table_btn-group.checkout-btn.new__cancel-btn').onclick = function (){
        $('#input-name').value = '';
        $('#input-seats').value = '';
        hideNewModal();
    }
    $('.new_table_btn-group.done-btn.new__done-btn').onclick = function (){
        if (isNaN(parseInt($('#input-seats').value))){

            $('.invalid').classList.add('active');

            setTimeout(function(){
                $('.invalid').classList.remove('active');
            }, 2000)
        }
        else
            submitCreatNewTable(hideNewModal);
    }
}

function showTableInfor(){
    $('.table-infor').classList.add('active');
}

function showEditForm(){
    $('.table-infor').classList.remove('active');
    $('.edit').classList.add('active');
}

function hideEditForm() {
    $('.edit').classList.remove('active');
}

function editTable(tb){
    $('#edit-name').value = tb.tableName;
    $('#edit-seats').value = tb.numSeats;
    showEditForm()
    $('.edit__cancel-btn').onclick = hideEditForm;
    $('.edit__done-btn').onclick = function (){
        if (isNaN(parseInt($('#edit-seats').value))){
            $('.invalid').classList.add('active');

            setTimeout(function () {
                $('.invalid').classList.remove('active');
            }, 2000)
        }else{
            let data = {
                "tableID": tb.tableID,
                "numSeats": $('#edit-seats').value,
                "tableName": $('#edit-name').value
            }

            let option = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }
            fetch(tableApi, option)
                .then(hideEditForm)
                .then(start)
                .then(start)
        }
    }
}
function hideTableInfor() {
    $('.table-infor').classList.remove('active');
    $('.delete-btn').classList.remove("hidden");
}

$('.seat').onclick = function(event){
    let id;
    if (event.target.classList[0] == 'table')
        id = event.target.classList[1];
    else
        if(event.target.parentNode.classList[0] == 'table')
            id = event.target.parentNode.classList[1]
        else
            if (event.target.parentNode.parentNode.classList[0] == 'table')
                id = event.target.parentNode.parentNode.classList[1]

    if(id != ''){
        let tb = tableList.find(function (t) {
            if(t.tableID == id) return t;
        });
        let sp = $$('.infor span');
        sp[0].innerHTML = `<h4>Table id:</h4> ${id}`;
        sp[1].innerHTML = `<h4>Table name:</h4> ${tb.tableName}`
        sp[2].innerHTML = `<h4>Number of seats:</h4> ${tb.numSeats}`
        if (tb.status == 'cancel') {
            $('.delete-btn').style.backgroundColor = 'var(--green-1)';
            $('.delete-btn').textContent = 'Recover';
        }else{
            $('.delete-btn').style.backgroundColor = 'rgb(255, 61, 0)';
            $('.delete-btn').textContent = 'Delete';
        }
            
        showTableInfor();
        $('.infor__cancel-btn').onclick = hideTableInfor;
        $('.delete-btn').onclick = function(){
            let data = {
                "tableID": id,
                "status": (tb.status == 'cancel') ? 'free' : 'cancel'
             }

            let option = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }
            fetch(tableApi, option)
                .then(hideTableInfor())
                .then(start())
                .then(start())
                .then(start())
                .then(start())

        }
        $('.edit-btn').onclick = function (){
            editTable(tb);
        }
    }
}

