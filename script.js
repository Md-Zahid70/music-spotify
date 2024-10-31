//Game Constants & Variable
let inputDir = {x: 0, y: 0};
const foodSound = new Audio('food.mp3');
const gameOverSound = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const musicSound = new Audio('music.mp3');
let speed = 7;
let score = 0;
let lastPaintTime = 0;
let snakArr = [
    {x: 13, y: 15}
]
let food = {x: 6, y: 7};

//Game Functions
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snak){
    //if you bump into yourself
    for (let i = 1; i < snakArr.length; i++) {
        if(snakArr[i].x === snak[0].x && snakArr[i].y === snak[0].y){
            return true;
        }   
    }
    if(snak[0].x >= 18 || snak[0].x <= 0 || snak[0].y >= 18 || snak[0].y <= 0){
        return true;
    }
}

function gameEngine(){
    //part 1: updating the snake array & food
    if(isCollide(snakArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x: 0, y: 0};
        alert("Game Over. Press any key to play again");
        snakArr = [{x: 13, y: 15}];
        musicSound.play();
        score = 0;
    }

    //if you have eaten the food, increament the score and regenrate the food
    if(snakArr[0].y === food.y && snakArr[0].x === food.x){
        foodSound.play();
        score += 1;
        if(score > hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        scoreBox.innerHTML = 'Score ' + score;
        snakArr.unshift({x: snakArr[0].x + inputDir.x, y: snakArr[0].y + inputDir.y});
        let a =  2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())};
    }

    //moving the snake
    for(let i= snakArr.length -2; i>=0; i--){
        snakArr[i+1] = {...snakArr[i]};
    }

    snakArr[0].x += inputDir.x;
    snakArr[0].y += inputDir.y;
    
    //part 2: display the snake array & food
    //display the snak
    board.innerHTML = "";
    snakArr.forEach((e, index) => {
        snakElement = document.createElement('div');
        snakElement.style.gridRowStart = e.y;
        snakElement.style.gridColumnStart = e.x;
        
        if(index === 0){
            snakElement.classList.add('head');
        }else{
            snakElement.classList.add('snak');
        }
        board.appendChild(snakElement);
    });
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}


//main logic start here
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',e => {
    inputDir = {x: 0, y:1}//start the game
    moveSound.play();
    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
                
    }
})