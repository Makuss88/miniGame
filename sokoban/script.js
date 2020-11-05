const brick = document.querySelectorAll('.brick');

//board
const board = ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall',
               'wall', 'f', 'f', 'f', 'f', 'f', 'player', 'f', 'f', 'wall',
               'wall', 'f', 'f', 'f', 'f', 'f', 'f', 'coin', 'f', 'wall',
               'wall', 'f', 'f', 'f', 'chest', 'f', 'f', 'f', 'f', 'wall',
               'wall', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'wall',
               'wall', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'wall',
               'wall', 'f', 'f', 'coin', 'f', 'f', 'f', 'wall', 'f', 'wall',
               'wall', 'f', 'f', 'f', 'f', 'chest', 'f', 'f', 'f', 'wall',
               'wall', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'wall',
               'wall', 'wall', 'wall', 'wall', 'wall',  'wall', 'wall', 'wall', 'wall', 'wall'];
               

let moveUp = false;
let moveDown = false;
let moveLeft = false;
let moveRigth = false;

let positionPlayer; // start player position
let x;
let movePlayer = 0;

let chest = [];
let howManyCoins = 0;

//arrow function start game
const buildBoard = (board) => {

  for (let i = 0; i < board.length; i++) {
    brick[i].classList.add(board[i])

    if (brick[i].classList.contains('player')){
      positionPlayer = i;
    }

    if (brick[i].classList.contains('chest')){
      chest.push(brick[i])
    }

    if (brick[i].classList.contains('coin')){
      howManyCoins++;
    }
  }
  x = positionPlayer;
}

//function winnig game
const winningGame = () => {

  let winner = 0;
  for (let i = 0; i < howManyCoins; i++){
    if (chest[i].classList.contains('coin')){
      winner++;
    }
  }
  if (winner == howManyCoins){
    console.log('hura')
    console.log(movePlayer)
  }
}

//moving player
const movingPlayer = () => {
  if (moveRigth && !brick[x + 1].classList.contains('wall')) {
    if (brick[x + 1].classList.contains('coin') && (brick[x + 2].classList.contains('coin') || brick[x + 2].classList.contains('wall'))) {
      console.log('zaslaby lub sciana')
    } else if (brick[x + 1].classList.contains('coin') &&  !brick[x + 2].classList.contains('wall')){
      brick[x + 1].classList.remove('coin');
      brick[x + 2].classList.add('coin');
      brick[x + 1].classList.add('player');
      brick[x].classList.remove('player');
      x = x + 1;
      movePlayer++;
    } else {
      brick[x + 1].classList.add('player');
      brick[x].classList.remove('player');
      x = x + 1;
      movePlayer++;
    }
  }
  
  if (moveLeft && !brick[x - 1].classList.contains('wall')) {

    if (brick[x - 1].classList.contains('coin') && (brick[x - 2].classList.contains('coin') || brick[x - 2].classList.contains('wall'))) {
      console.log('lewy slaby')
    } else if (brick[x - 1].classList.contains('coin') && !brick[x - 2].classList.contains('wall')) {
      brick[x - 1].classList.remove('coin');
      brick[x - 2].classList.add('coin');
      brick[x - 1].classList.add('player');
      brick[x].classList.remove('player');
      x = x - 1;
      movePlayer++;
    } else {
      brick[x - 1].classList.add('player');
      brick[x].classList.remove('player');
      x = x - 1;
      movePlayer++;
    }
  }

  if (moveUp && !brick[x - 10].classList.contains('wall')) {

    if (brick[x - 10].classList.contains('coin') && (brick[x - 20].classList.contains('coin') || brick[x - 20].classList.contains('wall'))) {
      console.log('gora gora')
    } else if (brick[x - 10].classList.contains('coin') && !brick[x - 20].classList.contains('wall')) {
      brick[x - 10].classList.remove('coin');
      brick[x - 20].classList.add('coin');
      brick[x - 10].classList.add('player');
      brick[x].classList.remove('player');
      x = x - 10;
      movePlayer++;
    } else {
      brick[x - 10].classList.add('player');
      brick[x].classList.remove('player');
      x = x - 10;
      movePlayer++;
    }
  }
  
  if (moveDown && !brick[x + 10].classList.contains('wall')) {
    if (brick[x + 10].classList.contains('coin') && (brick[x + 20].classList.contains('coin') || brick[x + 20].classList.contains('wall'))) {
      console.log('doly hej doly')
    } else if (brick[x + 10].classList.contains('coin') && !brick[x + 20].classList.contains('wall')){
      brick[x + 10].classList.remove('coin');
      brick[x + 20].classList.add('coin');
      brick[x + 10].classList.add('player');
      brick[x].classList.remove('player');
      x = x + 10;
      movePlayer++;
    } else {
      brick[x + 10].classList.add('player');
      brick[x].classList.remove('player');
      x = x + 10;
      movePlayer++;
    }
  }
}

//many information
const textInformation = () => {
  
}

//listner
const keyDown = (e) => {
  if (e.keyCode === 37){ //left
    moveLeft = true;
  }
  if (e.keyCode === 39){ //rigth
    moveRigth = true;
  }
  if (e.keyCode === 38){
    moveUp = true;
  }
  if (e.keyCode === 40){
    moveDown = true;
  }
}

const keyUp = (e) => {
  if (e.keyCode === 37){
    moveLeft = false;
  }
  if (e.keyCode === 39){
    moveRigth = false;
  }
  if (e.keyCode === 38){
    moveUp = false;
  }
  if (e.keyCode === 40){
    moveDown = false;
  }


}

let startGame = true

const myGame = () => {
  
  if (startGame) {
    buildBoard(board);
    startGame = false;  
  }
  
  movingPlayer();
  winningGame();
}

setInterval(myGame, 120);

document.addEventListener('keyup', keyUp, false);
document.addEventListener('keydown', keyDown, false);