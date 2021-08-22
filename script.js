const canvas = document.querySelector('canvas');
const ctx = canvas.getContext("2d"); //"kreslení věci"

const snakeSize = 30;

let snakeSpeed = 30;
let snakePosX = 0;
let snakePosY = canvas.height/2;

let velocityX = 1;
let velocityY = 0;

const titleCountX = canvas.width / snakeSize;
const titleCountY = (canvas.height / snakeSize) * 2;

let foodPosX = 150;
let foodPosY = 120;

function gameLoop(){
    drawEverything();
    moveStuff();

    //requestAnimationFrame(gameLoop); //loop - velký frame rate
    setTimeout(gameLoop, 1000 / 8); //spuštění po určitém čase
}
gameLoop();

function moveStuff(){
    snakePosX += snakeSpeed * velocityX; //pohyb hada
    snakePosY += snakeSpeed * velocityY; //pohyb hada

    //kolize se stěnou
    if(snakePosX > (canvas.width - snakeSize)){ //vrácení hada na začátek
        snakePosX = 0;
    }
    if(snakePosX < 0){ //vrácení hada na začátek
        snakePosX = canvas.width;
    }
    if(snakePosY > (canvas.height - snakeSize)){ //vrácení hada na začátek
        snakePosY = 0;
    }
    if(snakePosY < 0){ //vrácení hada na začátek
        snakePosY = canvas.height;
    }

    //kolize s jídlem
    if (snakePosX === foodPosX && snakePosY === foodPosY){
        foodPosX = Math.floor(Math.random() * titleCountX) * snakeSize;
        foodPosY = Math.floor(Math.random() * titleCountY/2) * snakeSize;
    }
}

function drawEverything(){
    rectangle("#ffbf00", 0, 0, canvas.width, canvas.height); //pozadí
    drawGrid();
    rectangle("black", snakePosX, snakePosY, snakeSize, snakeSize/2); //had

    //food
    rectangle('black', foodPosX, foodPosY, snakeSize, snakeSize/2);
}

function rectangle(color, x, y, width, height){
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height); //vykreslování objektu + hada
}

document.addEventListener('keydown', keyPush);
function keyPush(event){
    switch(event.key){
        case 'ArrowLeft':
            if (velocityX !== 1){
                velocityX = -1;
                velocityY = 0;
            }
            break
        case 'ArrowUp':
            if (velocityY !== 1){
                velocityX = 0;
                velocityY = -1;
            }
            break
        case 'ArrowRight':
            if (velocityX !== -1){
                velocityX = 1;
                velocityY = 0;
            }
            break
        case 'ArrowDown':
            if (velocityY !== -1){
                velocityX = 0;
                velocityY = 1;
            }
            break
    }
}

function drawGrid(){
    for (let i = 0; i < titleCountX; i++){
        for (let j = 0; j < titleCountY; j++){
            rectangle("white", snakeSize * i, (snakeSize * j)/2, snakeSize - 1, (snakeSize/2) - 1);
        }
    }
}