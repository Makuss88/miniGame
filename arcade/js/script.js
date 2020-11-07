const ctx = document.getElementById('myCanvas').getContext('2d');

let moveRigth = false;
let moveLeft = false;
let moveSpace = false;

//flag of get coins (to win the game)
let coinsFlag = 0;

const player = {
  x: 1,
  y: 400, 
  w: 30,
  h: 60,
  color: 'RED',
}

const bricks = [
  {x: 100, y: 400, w: 50, h:  60, color: 'BLUE'},
  {x: 200, y: 300, w: 50, h: 160, color: 'BLUE'},
  {x: 400, y: 100, w: 50, h: 160, color: 'BLUE'},
  {x: 350, y: 0,   w: 50, h: 160, color: 'BLUE'},
]

const coins = [
  {x: 130, y: 350, w: 30, h: 30, color: 'GREEN'},
  {x: 230, y: 250, w: 30, h: 30, color: 'GREEN'},
  {x: 430, y: 50, w: 30, h: 30, color: 'GREEN'}
]

//colission player-brick (wall, etc.)
const collisionBrick = () => {
  bricks.forEach(brick => {
    if (player.x + player.w > brick.x && player.x < brick.x + brick.w && player.y < brick.y + brick.h && player.y + player.h > brick.y) {
      player.x = 1;
      player.y = 400;
    }
  })
}

//colission player-wall (backround??)
const collisionWall = () => {
  if (player.x < 0) {
    player.x = 0;
  }
  
  if (player.x > ctx.canvas.width - player.w) {
    player.x = ctx.canvas.width - player.w;
  }
  
  if (player.y < 0) {
    player.y = 0;
  }

  if (player.y > ctx.canvas.height - player.h - 40) {
    player.y = ctx.canvas.height - player.h - 40;
  }
}

const collisionCoins = () => {
  coins.forEach(brick => {
    if (player.x + player.w > brick.x && player.x < brick.x + brick.w && player.y < brick.y + brick.h && player.y + player.h > brick.y) {
      brick.y = ctx.canvas.height;
      coinsFlag++;
    }
    if (coinsFlag == coins.length) { 
      console.log('wygarna');
    }
  })
}

//draw Player
const drawPlayer = () => {
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.w, player.h);
}

//draw Bricks
const drawBricks = () => {
  bricks.forEach(brick => {
    ctx.beginPath();
    ctx.fillStyle = brick.color;
    ctx.fillRect(brick.x, brick.y, brick.w, brick.h);
  })
}

//draw Coins
const drawCoins = () => {
  coins.forEach(coin => {
    ctx.beginPath();
    ctx.fillStyle = coin.color;
    ctx.fillRect(coin.x, coin.y, coin.w, coin.h);
  })
}

//function moving Player
const movingPlayer = () => {
  if (moveRigth){
    player.x += 4;
  }
  if (moveLeft){
    player.x -= 4;
  }
  if (moveSpace){
     player.y -= 4;
  }
  if (!moveSpace){
    player.y += 4;
  }
}

//function draw in loop
const draw = () => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.beginPath();
  ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.stroke();
  drawCoins();
  drawPlayer();
  drawBricks();
}

//function GAME!
const game = () => {
  draw();
  movingPlayer();
  collisionWall();
  collisionBrick();
  collisionCoins();
}

//add EventListner about keypress
const keyDownHandler = (e) => {
  if (e.keyCode === 37){ //left
    moveLeft = true;
  }
  if (e.keyCode === 39){ //rigth
    moveRigth = true;
  }
  if (e.keyCode === 32){ //space
    moveSpace = true;
  }
}

const keyUpHandler = (e) => {
  if (e.keyCode === 37){
    moveLeft = false;
  }
if (e.keyCode === 39){
moveRigth = false;
}
if (e.keyCode === 32){
moveSpace = false;
}
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

setInterval(game, 30)