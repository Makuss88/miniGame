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
}
function drawRect(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

const drawGame = () => {
  drawRect(0,0, canvas.width, canvas.height, "GREEN")
  drawPlayer(user.x, user.y, user.w, user.h, user.color);
  drawPlayer(com.x, com.y, com.w, com.h, com.color);
  drawCircle(ball.x, ball.y, ball.r, ball.color);
};  

drawGame();