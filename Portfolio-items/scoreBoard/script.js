let score = 0


const btn1 = document.getElementById('btn1')
const btn2 = document.getElementById('btn2')
const btn3 = document.getElementById('btn3')
const btn4 = document.getElementById('btn4')
const btn5 = document.getElementById('btn5')
const btn6 = document.getElementById('btn6')
const home = document.getElementById('home')
const guest = document.getElementById('guest')




btn1.addEventListener('click', function(){
    score += 1
    home.innerText = score
})


btn2.addEventListener('click', function() {
    score += 2
    home.innerText = score
})

btn3.addEventListener('click', function() {
    score += 3
    home.innerText = score 
})

btn4.addEventListener('click', function() {
    score += 1 
    guest.innerText = score
})

btn5.addEventListener('click', function() {
    score += 2
    guest.innerText = score 
})

btn6.addEventListener('click', function() {
    score += 3
    guest.innerText = score
})

