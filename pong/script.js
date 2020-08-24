const canvas = document.getElementById('pong');
const ctx = canvas.getContext('2d');

const user = {
  x: 20,
  y: canvas.height / 2 - 100 / 2,
  w: 20,
  h: 100, 
  color: "BLUE",
  score: 0,
};

const com = {
  x: canvas.width - 20 - 20,
  y: canvas.height / 2 - 100 / 2,
  w: 20,
  h: 100, 
  color: "RED",
  score: 0,
};

const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  r: 10,
  velX: 2,
  velY: 2,
  color: 'white',
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

const drawRect = (x, y, w, h, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
};

const drawText = (text, x, y, color) => {
  ctx.fillStyle = color;
  ctx.font = "120px fantasy";
  ctx.fillText(text, x, y);
};

const drawGame = () => {
  drawRect(0,0, canvas.width, canvas.height, "GREEN")
  drawText(user.score, canvas.width / 4, 100, "BLACK");
  drawText(com  .score, 3 * canvas.width / 4, 100, "BLACK");
  drawPlayer(user.x, user.y, user.w, user.h, user.color);
  drawPlayer(com.x, com.y, com.w, com.h, com.color);
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

const move = (event) => {
  let rect = canvas.getBoundingClientRect();
  user.y = event.clientY - rect.top - user.h / 2;
};

const resetBall = () => {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.velX = 2
  ball.velX = - ball.velX;
}

canvas.addEventListener('mousemove', move);

const updateGame = () => {
  com.y = ball.y - 50; //add move com paddle

  ball.x += ball.velX;
  ball.y += ball.velY;
  
  if (ball.y + ball.r > canvas.height || ball.y - ball.r < 0) {
    ball.velY = -ball.velY;
  }

  let player = (ball.x < canvas.height) ? user : com;

  if (collision(ball, player)){
    (ball.velX > 0) ? ball.velX += 0.5 :ball.velX -= 0.5;
     ball.velX = -ball.velX;
  }

  if (ball.x - ball.r < 0){
    com.score++;  
    resetBall();
  } else if (ball.x + ball.r > canvas.width){
    user.score++;
    resetBall();
  }
};

const render = () => {
  updateGame();
  drawGame();
};

const frame = 50
setInterval(render, 1000 / frame);