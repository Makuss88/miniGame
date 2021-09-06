const imgPlayer = new Image();
const ctx = document.getElementById('myCanvas').getContext('2d');

let moveRigth = false;
let moveLeft = false;
let moveUp = false;
let movingPlayerFlag = true;
//flag of get coins (to win the game)
let coinsFlag = 0;

const player = {
  x: 130,
  y: 100,
  w: 48,
  h: 64,
  color: 'RED',
}

const bricks = [
  { x: 200, y: 400, w: 100, h: 100, color: 'BLUE', p: 0 },
  // {x: 200, y: 300, w: 100, h: 100, color: 'BLUE', p:1},
  // {x: 400, y: 100, w: 50, h: 160, color: 'BLUE'},
  // {x: 350, y: 0,   w: 50, h: 160, color: 'BLUE'},
]

const rect = { x: 100, y: 400, w: 100, h: 100, color: 'BLUE', p: 0 }

const coins = [
  { x: 130, y: 350, w: 30, h: 30, color: 'GREEN' },
  { x: 230, y: 250, w: 30, h: 30, color: 'GREEN' },
  { x: 430, y: 50, w: 30, h: 30, color: 'GREEN' }
]

// colission player - brick(wall, etc.)
const collisionBrick = (r1, r2) => {
  return !(
    r1.x > r2.x + r2.w ||
    r1.x + r1.w < r2.x ||
    r1.y > r2.y + r2.h ||
    r1.y + r1.h < r2.y
  );
}

// if (player.y > rect.y && player.y < rect.y + rect.h) {    

//   if (player.x < rect.x){
//     player.x =  rect.x - player.w
//   } else if (player.x > rect.x){
//     player.x = rect.x + rect.w
//   }
// } else if (player.x > rect.x && player.x < rect.x + rect.w) {

//   if (player.y < rect.y){
//     player.y =  rect.y - player.h
//   } else if (player.y > rect.y){
//     player.y = rect.y + rect.h
//   }
// }
// }

//colission player-wall (backround??)
const collisionWall = () => {

  if (player.x < 0) {
    player.x = 0;
  }

  if (player.x > ctx.canvas.width - 48) {
    player.x = ctx.canvas.width - 48;
  }

  if (player.y < 0) {
    player.y = 0;
  }

  if (player.y > ctx.canvas.height - 64) {
    player.y = ctx.canvas.height - 64;
  }
}

//colission player-coins//colission player-wall
const collisionCoins = () => {
  coins.forEach(brick => {
    if (player.x + player.w > brick.x && player.x < brick.x + brick.w && player.y < brick.y + brick.h && player.y + player.h > brick.y) {
      brick.y = ctx.canvas.height;
      coinsFlag++;
    }
    if (coinsFlag == coins.length) {
      // alert('wygarna');
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
let move = false;
//function moving Player
const movingPlayer = () => {
  if (moveRigth) {
    player.x += 4;
  }
  if (moveLeft) {
    player.x -= 4;
  }
  if (moveUp) {
    player.y -= 4;
  }
  if (!moveUp) {
    if (collisionBrick(player, bricks[0])) {
      move = true;
    }
    if (move) {
      player.y += 0;
    }
    else {
      player.y += 4;
      move = false;
    }
  }
  // }

}

//function draw in loop
const draw = () => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.beginPath();
  ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.stroke();
  //ctx.drawImage(imgPlayer, player.x, player.y);
  drawCoins();
  drawPlayer();
  drawBricks();
}

//function GAME!
const game = () => {
  requestAnimationFrame(game)
  draw();
  movingPlayer();
  collisionWall();
  // console.log(collisionBrick(player, bricks[0]));
  collisionCoins();
}

//add EventListner about keypress
const keyDownHandler = (e) => {
  if (e.keyCode === 37) { //left
    moveLeft = true;
  }
  if (e.keyCode === 39) { //rigth
    moveRigth = true;
  }
  if (e.keyCode === 38) { //space
    moveUp = true;
  }
}

const keyUpHandler = (e) => {
  if (e.keyCode === 37) {
    moveLeft = false;
  }
  if (e.keyCode === 39) {
    moveRigth = false;
  }
  if (e.keyCode === 38) {
    moveUp = false;
  }
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

imgPlayer.src = "img/player.png";
imgPlayer.onload = game;