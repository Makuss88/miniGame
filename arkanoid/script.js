//setup
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;
storkeColor = "BLACK";

let winnigGameFlag = false;
let gameOverFlag = false;
let livePlayer = 3;
let musicStartFlag = true;
let firstMoveFlag = false;
let gameStart = false;
let moveFlag = false;
let moveEnter = false;

let startMusic =  new Audio("audio/start.mp3");
let bounceAudio = new Audio("audio/bounce.wav");
let wallAudio =   new Audio("audio/wall.wav");
let liveAudio =   new Audio("audio/liveOver.wav");

//ball
const ball = {
  x: canvas.width / 2,
  y: canvas.height - 40,
  radius: 10,
  color: 'RED',
  dx: 2,  //move 
  dy: -2, //move
}

// paddle 
const paddle = {
  x: (canvas.width / 2) - 50,
  y: canvas.height - 30,
  width: 100,
  height: 20,
  color: 'GREEN',  
}

//brick
const bricks = [
  {x:   2,  y:50,  w: 196, h:46, color: 'ORANGE'},
  {x:   2,  y:100, w: 196, h:46, color: 'ORANGE'},
  {x:   2,  y:150, w: 196, h:46, color: 'ORANGE'},
  {x:   2,  y:200, w: 196, h:46, color: 'ORANGE'},
  {x: 202,  y:100, w: 196, h:46, color: 'TOMATO'},
  {x: 202,  y:150, w: 196, h:46, color: 'TOMATO'},
  {x: 202,  y:200, w: 196, h:46, color: 'TOMATO'},
  {x: 402,  y:150, w: 196, h:46, color: 'MediumSeaGreen'},
  {x: 402,  y:200, w: 196, h:46, color: 'MediumSeaGreen'},
  {x: 602,  y:200, w: 196, h:46, color: 'DodgerBlue'},
]

//moving
let moveLeft = false;
let moveRigth = false;
let moveSpace = false;

//draw ball
const drawBall = (ball) => {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
  ctx.fillStyle = ball.color;
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.strokeStyle = storkeColor;
  ctx.closePath();
}

//draw paddel
const drawPaddle = (paddle) => {
  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
  ctx.strokeStyle = storkeColor;
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = paddle.color;
  ctx.fill();
  ctx.shadowColor = 'BLACK';
  ctx.shadowBlur = 15;
  ctx.shadowOffsetX = 15;
  ctx.shadowOffsetY = 15;
  ctx.closePath();
}

//draw bricks
const drawBricks = (bricks) => {
  bricks.forEach(brick => {
    ctx.beginPath();
    ctx.rect(brick.x, brick.y, brick.w, brick.h);  
    ctx.strokeStyle = storkeColor;
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.fillStyle = brick.color;
    ctx.fill();
    // ctx.closePath();
  })
}

//collision ball-brick
const collisionBallBrick = () => {
  for (let i = 0; i < bricks.length; i++){
    let b = bricks[i];
    if (ball.y - ball.radius * 2 < b.y + b.h && ball.y + ball.radius > b.y && ball.x - ball.radius/2 > b.x && ball.x + ball.radius/2 < b.x + b.w){
      ball.dy = -ball.dy;
      b.x = 1000;
      bounceAudio.play();
    }

    if (ball.x + ball.radius < b.x + b.w && ball.x + ball.radius > b.x && ball.y - ball.radius/2 > b.y && ball.y + ball.radius/2 < b.y + b.h) {
      ball.dx = -ball.dx;
      b.x = 1000;
      bounceAudio.play();
    }
  }
}

//collision ball-wall
const collisionBallWall = () => {
  if (ball.x + ball.dx > canvas.width-ball.radius || ball.x + ball.dx < ball.radius) {
    ball.dx = -ball.dx;
    wallAudio.play();
  }

  if (ball.y + ball.dy < ball.radius) {
    ball.dy = -ball.dy;
    wallAudio.play();
  } else if (ball.y + ball.dy > canvas.height - ball.radius - 28) {
    if (ball.x + ball.radius > paddle.x && ball.x - ball.radius < paddle.x + paddle.width) {
      ball.dy = -ball.dy;
      wallAudio.play();
    } else {
      if (livePlayer == 1){
        gameOverFlag = true;
        liveAudio.play();
      }
      liveAudio.play();
      livePlayer--;
      ball.x = canvas.width / 2;
      ball.y = canvas.height - 40;
      ball.dx = 2;
      ball.dy = -2;
      paddle.x = (canvas.width - paddle.width) / 2; 
    }
  }
}

const winnigGame = () => {
  let counterWinningGame = 0;
  for (let i = 0; i < bricks.length; i++) {
    if (bricks[i].x === 1000) {
      counterWinningGame++;
    }
  }
  if (counterWinningGame === bricks.length) { 
    winnigGameFlag = true;
  }
}

const drawInfo = () => {
  ctx.font = "30px Lucida Console";
  ctx.fillStyle = "AQUA";
  let counter = bricks.length;
  for (let i = 0; i < bricks.length; i++ ){
    if (bricks[i].x == 1000){
      counter--;
    }
  }
  let textBricks = "Bricks: " + counter; 
  ctx.fillText(textBricks, 80, 30); 
  let textLive = 'Live: ' + livePlayer;
  ctx.fillText(textLive, 360, 30); 
}

const drawText = (color) =>{
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "50px Comic Sans MS";
  ctx.fillStyle = color;
  ctx.textAlign = "center";  
}

const drawGameOver = () => {
  drawText('RED')
  ctx.fillText("Ślepa uliczka - koniec gry...", canvas.width / 2, canvas.height / 2); 
  ctx.fillText("ENTER i grasz jeszcze raz!", canvas.width / 2, canvas.height / 2 + 80);
  if (moveEnter) {
    document.location.reload();
  }
}

const drawGameWinning = () => {
  drawText('VIOLET');
  ctx.fillText("WYGRANA!", canvas.width / 2, canvas.height / 2);
  ctx.fillText("ENTER i grasz jeszcze raz!", canvas.width / 2, canvas.height / 2 + 80);
  if (moveEnter) {
    document.location.reload();
  }
}

const firstMove = () => {
  firstMoveFlag = true;
  moveFlag = true;
}

const draw = () =>  {  
  if (moveSpace) {
    gameStart = true;
  } else {
    drawText('BLACK');
    ctx.fillText("press SPACE to start game", canvas.width / 2, canvas.height / 2);
  }

  if (gameStart) {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    
    drawBall(ball);
    drawPaddle(paddle);
    drawBricks(bricks);
    drawInfo();
    
    collisionBallBrick();
    collisionBallWall();
    
    winnigGame();
    
    if (gameOverFlag) {
      drawGameOver();
    } else if (winnigGameFlag) {
      drawGameWinning();   
    } else {
      if (moveRigth && paddle.x < canvas.width - paddle.width && moveFlag) {
        paddle.x += 6;
      }
      else if (moveLeft && paddle.x > 0 && moveFlag) {
        paddle.x -= 6;
      }

      if (firstMoveFlag) {
        ball.x += ball.dx;
        ball.y += ball.dy;
      } else {
        startMusic.play();
        setTimeout(function(){ firstMove() }, 3000)  
      }
    }
  }
}

// add LIstner
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
  if (e.keyCode === 13){ //enter
    moveEnter = true;
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
  if (e.keyCode === 13){
    moveEnter = false;
  }
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

let game = setInterval(draw, 10);