const date = document.querySelector(".date");
const main = document.querySelector(".main");
const num = document.querySelector(".num")
const check = document.querySelector(".checkbox");
const btn = document.querySelector(".btn")
const time = document.querySelector(".time")
const day = document.querySelector(".day")
const mone = document.querySelector(".money")

let total = 0;
const stats = {
    days : 0,
    money : 0,
    over: 0
}

const histoy =JSON.parse(localStorage.getItem("data") ) || [];
update()



function add() {
    if (!(date.value)) {
        return
    }
    if (check.checked && num.value === '') {
        return
    }
    main.innerHTML = '';
    histoy.push({
        date : date.value,
        overtime : check.checked,
        hrs : num.value
    })
    
    update()
    date.value = ''
    check.checked = false
    num.value = ''
    time.style.display = "none"
    num.style.display = "none"
}

function dlete(index) {
    histoy.splice(index,1)
    main.innerHTML = '';
    update()
}

function change() {
    if (check.checked) {
        num.style.display = "block"
            time.style.display = "block"
    }else{ num.style.display = "none"
            time.style.display = "none"
    }
}
function update() {
    for (let index = 0; index < histoy.length; index++) {
        if (histoy[index].overtime) {
            main.innerHTML +=  `<div class="his">
            <div class="items">${histoy[index].date}</div>
            <p class="one">|</p>
            <div class="items">نعم</div>
            <p class="two">|</p>
            <div class="items">${histoy[index].hrs}</div>
             <div class="delete"><button onclick="dlete(${index})">حذف</button></div>
        </div>`
        } else {
            main.innerHTML +=  `<div class="his">
            <div class="items">${histoy[index].date}</div>
            <p class="one">|</p>
            <div class="items">لا</div>
            <p class="two">|</p>
            <div class="items">لا يوجد</div>
            <div class="delete"><button onclick="dlete(${index})">حذف</button></div>
            </div>`
        }
        stats.days = index;
        stats.over += histoy[index].hrs
        
    }
    day.innerHTML = stats.days + 1
    stats.money = (stats.days + 1) * 100;
    stats.over = stats.over * 12.5
    total = stats.money + stats.over;
    mone.innerHTML = total + "$"

    localStorage.setItem("data",JSON.stringify(histoy))
}