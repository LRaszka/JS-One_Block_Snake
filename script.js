const canvas = document.querySelector('canvas');
const ctx = canvas.getContext("2d"); //"kreslení věci"

const snakeSize = 30;

let snakeSpeed = 5;
let snakePosX = 0;
let snakePosY = canvas.height / 2 - snakeSize / 2;

let velocityX = 1;
let velocityY = 0;

const titleCountX = canvas.width / snakeSize;
const titleCountY = (canvas.height / snakeSize) * 2;

function gameLoop(){
    drawEverything();
    moveStuff();

    //requestAnimationFrame(gameLoop); //loop - velký frame rate
    setTimeout(gameLoop, 1000 / 15); //spuštění po určitém čase
}
gameLoop();

function moveStuff(){
    snakePosX += snakeSpeed * velocityX; //pohyb hada
    snakePosY += snakeSpeed * velocityY; //pohyb hada

    if(snakePosX > canvas.width){ //vrácení hada na začátek
        snakePosX = 0;
    }
    if(snakePosX < -snakeSize){ //vrácení hada na začátek
        snakePosX = canvas.width;
    }
    if(snakePosY > canvas.height){ //vrácení hada na začátek
        snakePosY = 0;
    }
    if(snakePosY < -snakeSize){ //vrácení hada na začátek
        snakePosY = canvas.height;
    }
}

function drawEverything(){
    rectangle("#ffbf00", 0, 0, canvas.width, canvas.height); //pozadí
    drawGrid();
    rectangle("black", snakePosX, snakePosY, snakeSize, snakeSize/2); //had
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