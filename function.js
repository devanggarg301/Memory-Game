// note: if two cards are matched, dont touch them again while guessing other cards
const grid = document.querySelector(".grid")
const container = document.querySelector(".grid")
const reset = document.querySelector("button")
const guesses = document.querySelector("#guess")
const timer = document.querySelector("#time")
const high = document.querySelector(".highTimer")
const hard = document.querySelector(".hardMode")
hardMode = false;
let emojis;
let updateEmojis = ()=>{
    if(!hardMode){
    emojis = ["😍", "🥲", "😎", "😭", "🤡", "💖", "💥", "✌", "😍", "🥲", "😎", "😭", "🤡", "💖", "💥", "✌"]
    }
    if(hardMode){
        emojis = ["red", "red", "green", "green", "blue", "blue", "yellow", "yellow", "purple", "purple", "orange", "orange", "pink", "pink", "turquoise", "turquoise"]
    }
}
var lastClickedDiv = null
let timer_start = false;
let guess = 0;
let sec = 0;
let min = 0;
let interval;
let match = 0;
let newSec,newMin;
let highSec=0;
let highMin=1000;
const shuffleEmojis = () => {
    for (let x = 15; x > 0; x--) {
        let y = Math.floor(Math.random()*(x+1))
        let temp = emojis[x]
        emojis[x] = emojis[y]
        emojis[y] = temp
    }
}

    let reveal = (card, emoji) => {
    if(!hardMode){
    card.style.backgroundColor = "#fff"
    card.style.transform = "rotateY(180deg)"
    card.innerText = emoji
    }else{
    card.style.backgroundColor = emoji
    card.innerText = emoji
    card.style.color = "transparent"
    card.style.transform = "rotateY(180deg)"
        }
}
const cover = (card) => {
    card.style.backgroundColor = "#229b7f"
    card.style.transform = "rotateY(0deg)"
    card.innerText = ""
    // card.style.color = "";
}
const createCards = () => {
    grid.innerHTML = "";
    shuffleEmojis()
    for (let x = 0; x < 16; x++) {
        const div = document.createElement("div")
        div.classList.add("card")
        grid.appendChild(div)

        div.addEventListener("click", () => {
            if(!timer_start){
                timer_start = true;
                startTimer();
            }
            reveal(div, emojis[x])
            if(lastClickedDiv!==div){
                guess++;
            updateText(guess);
            }
            
            if (lastClickedDiv !== null) {
                if(lastClickedDiv!==div){
                    if (lastClickedDiv.innerText !== div.innerText) {
                        const clickedDiv = lastClickedDiv
                        const currentDiv = div
                        setTimeout(() => {
                            cover(clickedDiv)
                            cover(currentDiv)
                        }, 500)

                    }else{
                        match+=2;
                        changeShadow();
                        if(match==16){
                            clearInterval(interval);
                            if(min<highMin){
                                highMin = min<10?`0${min}`:min;
                                highSec = sec<10?`0${sec-1}`:sec-1;
                            }else if( min==highMin&&sec<=highSec){
                                    highSec = sec<10?`0${sec}`:sec;
                            }
                            updateHighScore();
                            
                            setTimeout(()=>{
                                alert(`You won! in ${newMin}:${newSec} and ${guess} guesses`);
                            },1000);
                        }
                    }
                    lastClickedDiv = null
                }
            } else {
                lastClickedDiv = div
            }
        })
    }
}

reset.addEventListener("click", () => {
    shuffleEmojis()
    guess = 0;
    match = 0;
    changeShadow();
    sec = 0;
    min = 0;
    clearInterval(interval);
    timer.innerText = `TIMER: 00:00`;
    timer_start = false;
    updateText(guess);
    const cards = Array.from(grid.querySelectorAll(".card"))
    cards.forEach((card) => {
        cover(card)
    })
})

updateEmojis();
createCards();

function updateText(guess){
    guesses.innerText = `GUESSES: ${guess}`;
}
function startTimer(){
if(timer_start){
    interval = setInterval(()=>{
        newSec = sec<10?`0${sec}`:sec;
        newMin = min<10?`0${min}`:min;

        timer.innerText = `TIMER: ${newMin}:${newSec}`
        sec++;
        if(sec===60){
            sec=0;
            min++;
        }
    },1000);    
}}
function updateHighScore(){
    high.innerText = `HighScore: ${highMin}:${highSec}`;
}

let changeShadow = ()=>{
    if(match == 0){
        container.style.boxShadow = 'none';
    }
    if(match == 2){
        container.style.boxShadow = '0 10px 20px rgba(255, 105, 105, 0.9)';
    }
    if(match == 4){
        container.style.boxShadow = '0 10px 20px rgba(255, 153, 102, 0.9)';
    }
    if(match == 6){
        container.style.boxShadow = '0 10px 20px rgba(255, 178, 102, 0.9)';
    }
    if(match == 8){
        container.style.boxShadow = '0 10px 20px rgba(255, 204, 102, 0.9)';
    }
    if(match == 10){
        container.style.boxShadow = '0 10px 20px rgba(170, 225, 102, 0.9)';
    }
    if(match == 12){
        container.style.boxShadow = '0 10px 20px rgba(136, 215, 102, 0.9)';
    }
    if(match == 14){
        container.style.boxShadow = '0 10px 20px rgba(102, 204, 136, 0.9)';
    }
    if(match == 16){
        container.style.boxShadow = '0 10px 20px rgba(102, 204, 170, 0.9)';
    }
}
hard.addEventListener("click",()=>{
    hardMode = !hardMode;
    hard.innerText = hardMode?"NORMAL MODE":"HARD MODE";
    updateEmojis();
    createCards();
    shuffleEmojis()
    guess = 0;
    match = 0;
    changeShadow();
    sec = 0;
    min = 0;
    clearInterval(interval);
    timer.innerText = `TIMER: 00:00`;
    timer_start = false;
    updateText(guess);
    const cards = Array.from(grid.querySelectorAll(".card"))
    cards.forEach((card) => {
        cover(card)
    })
    lastClickedDiv = null
});