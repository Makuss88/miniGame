const canvas = document.getElementById('pong');
const ctx = canvas.getContext('2d');

const FRAME = 50;

const playerA = {
  x: 20,
  y: canvas.height / 2 - 100 / 2,
  w: 20,
  h: 100, 
  color: "BLUE",
  score: 0,
};

const playerB = {
  x: canvas.width - 20 - 20,
  y: canvas.height / 2 - 100 / 2,
  w: 20,
  h: 100, 
  color: 'RED',
  score: 4,
};

const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  r: 10,
  velX: 2,
  velY: 2,
  color: 'WHITE',
};

const drawBoard = (x, y, w, h, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
};

const drawText = (text, x, y, color) => {
  ctx.fillStyle = color;
  ctx.font = "120px fantasy";
  ctx.fillText(text, x, y);
};

const drawPlayer = (x, y, w, h, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
};

const drawCircle = (x, y, r, color) => {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2, false);
  ctx.closePath();
  ctx.fill();
};

const drawGame = () => {
  drawBoard(0,0, canvas.width, canvas.height, "GREEN");
  drawText(playerA.score, canvas.width / 4, 100, "BLACK");
  drawText(playerB  .score, 3 * canvas.width / 4, 100, "BLACK");
  drawPlayer(playerA.x, playerA.y, playerA.w, playerA.h, playerA.color);
  drawPlayer(playerB.x, playerB.y, playerB.w, playerB.h, playerB.color);
  drawCircle(ball.x, ball.y, ball.r, ball.color);
};  

const collision = (ball, player) => {
  ball.top = ball.y - ball.r;
  ball.button = ball.y + ball.r;
  ball.left = ball.x - ball.r;
  ball.rigth = ball.x + ball.r;

  player.top = player.y;
  player.button = player.y + player.h;
  player.rigth = player.x + player.w; 
  player.left = player.x;

  return ball.rigth > player.left && ball.button > player.top && ball.left < player.rigth && ball.top < player.button; 
};

const movePlayerA = (event) => {
  let rect = canvas.getBoundingClientRect();
  playerA.y = event.clientY - rect.top - playerA.h / 2;
};

const movePlayerB = (event) => {
  if (event.keyCode === 38) {
    playerB.y -= 15;
  }
  if (event.keyCode === 40) {
    playerB.y += 15;
  }
};

canvas.addEventListener('mousemove', movePlayerA);
document.addEventListener("keydown", movePlayerB);

const resetBall = () => {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.velX = 2 + Math.floor(2 * Math.random());
  ball.velY = 2 + Math.floor(2 * Math.random());
};

const updateGame = () => {
  ball.x += ball.velX;
  ball.y += ball.velY;
  
  if (ball.y + ball.r > canvas.height || ball.y - ball.r < 0) {
    ball.velY = -ball.velY;
  }

  let player = (ball.x < canvas.height) ? playerA : playerB;

  if (collision(ball, player)){
    (ball.velX > 0) ? ball.velX += 0.5 :ball.velX -= 0.5;
     ball.velX = -ball.velX;
  }

  if (ball.x + ball.r > canvas.width){
    playerA.score++; 
    if (playerA.score === 5){
      playerA.score = 0;
      playerB.score = 0;
      alert('PLAYER A WINS!');
    } 
    resetBall();
  } else if (ball.x - ball.r < 0){
    playerB.score++;
    if (playerB.score === 5){
      playerA.score = 0;
      playerB.score = 0;
      alert('PLAYER B WINS!');
    } 
    resetBall();
  }
};

const render = () => {
  updateGame();
  drawGame();
};

setInterval(render, 1000 / FRAME);