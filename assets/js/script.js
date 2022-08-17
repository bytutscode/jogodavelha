

let currentGame = {
    a1:'',a2:'',a3:'',
    b1:'',b2:'',b3:'',
    c1:'',c2:'',c3:''
};
let boxs = document.querySelectorAll('.box');
let warning = '';
let player= '';
let playing = false;
let mainTime = 20;
let totalTime = mainTime;
restart();

//evets

document.querySelector('.reset').addEventListener('click',restart);
boxs.forEach(item =>{
    item.addEventListener('click',clickBox)
});



//functions

function clickBox (e) {
    let box = e.target.getAttribute('data-key');
    if(playing){
       if(currentGame[`${box}`] == ''){
    currentGame[`${box}`] = player;
    changeTurn();
    }
    update();
    } else {
        showWaning('Recomece o Jogo');
    }
}

function showWaning (w) {
    document.querySelector('.warning-area-two').innerHTML = w;
}

function update () {
    document.querySelector('.player-turn').innerHTML = `A vez é do : ${player}`;
    boxs.forEach(key =>{
        let keyBox = key.getAttribute('data-key');
        key.innerHTML = currentGame[keyBox];
    });
    time();
    checkGame();
    if(!playing){
    clearInterval(myTime);
    document.querySelector('.time').innerHTML =`0:00`
    document.querySelector('.player-turn').innerHTML = 'A partida Acabou!'
    showWaning(warning);
    }
}

function checkGame () {
    if(hasWon('X')) {
        warning = 'venceu: X';}
    else if(hasWon('O')){
        warning = 'venceu: O';
    }
    else if(isfull()){
        warning = 'Deu empate!';
    }
    if(warning){
        playing = false;
        document.querySelector('.player-turn').innerHTML = ``;
    }
}

function hasWon (player) {
    let positionsToWin =
    ['a1,a2,a3','b1,b2,b3','c1,c2,c3',
     'c1,b2,a3','a1,b2,c3','a1,b1,c1',
     'a2,b2,c2','a3,b3,c3'];
    for(let w in positionsToWin){
      let pArray = positionsToWin[w].split(',');
      let won = pArray.every(option => currentGame[option] === player);
      if(won){
        for(let b in pArray){
            document.querySelector(`[data-key="${pArray[b]}"]`).style.color = 'green';
        }
        return true;
      }
      
    }
    return false;
}


function changeTurn () {
    player = (player == 'X')? 'O': 'X';
}

function restart () {
    let firstToPlay = Math.floor(Math.random() * 2);
    player = (firstToPlay == 0)? 'X': 'O';
    for(let i in currentGame){
        currentGame[i] = '';
    }
    let c = boxs;
    c.forEach((item)=>{
        let box = item;
        box.style.color = 'white';
    })
    playing = true;
    warning = '';
    showWaning('');
    update();
}

function isfull() {
   for(let i in currentGame){
    if(currentGame[i] == ''){
        return false
    } 
   }
   return true;
}
var timeCurrent = () => {
    totalTime--;
    if(totalTime < 10){
        document.querySelector('.time').innerHTML =`0:0${totalTime}`
    }else {
        document.querySelector('.time').innerHTML =`0:${totalTime}`;
    }

    if(totalTime < 0){
        changeTurn();
        update();
        totalTime = mainTime;
    }
    (totalTime <= 5)?document.querySelector('.time').style.color = 'red':document.querySelector('.time').style.color = 'white';
    
}
function time () {
    clearInterval(myTime);
    totalTime = mainTime;
    document.querySelector('.time').innerHTML =`0:${totalTime}`
    myTime = setInterval(timeCurrent,1000);
}

var myTime = setInterval(timeCurrent,1000);

