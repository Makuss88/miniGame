const btnStart = document.querySelector('#btn-start');
const gamePaddle = document.querySelectorAll(".paddle");
const gameBoard = document.querySelector('#game-board');
const gameState = [[gamePaddle[0], gamePaddle[1], gamePaddle[2], gamePaddle[3]],
                   [gamePaddle[4], gamePaddle[5], gamePaddle[6], gamePaddle[7]],
                   [gamePaddle[8], gamePaddle[9], gamePaddle[10], gamePaddle[11]],
                   [gamePaddle[12], gamePaddle[13], gamePaddle[14], gamePaddle[15]]];
let x, y;
let emptyX, emptyY;
const lineShuffle = document.querySelector('#line');

let flagShuffle = false;
let counterShuffling = 0;
let flagOverShuffling = false;

const render = (gameBoard, gameState) => {
  gameState.forEach((row, rowIndex) => {
    row.forEach((column, columnIndex) => {
      column.style.top = `${rowIndex * 100}px`;
      column.style.left = `${columnIndex * 100}px`;
      column.style['background-position-y'] = `-${rowIndex*100}px`;
      column.style['background-position-x'] = `-${columnIndex*100}px`;
      
      gameBoard.appendChild(column);
    })
  })
}

const moveElement = (el1, el2) => {
  const tempTop = el1.style.top;
  const tempLeft = el1.style.left;
  
  el1.style.top = el2.style.top;
  el1.style.left = el2.style.left;
  
  el2.style.top = tempTop;
  el2.style.left = tempLeft;
}

const ifCanMoving = () => {
  if ((y === emptyY && (x + 1 === emptyX || x - 1 === emptyX)) || 
  (x === emptyX && (y + 1 === emptyY || y - 1 === emptyY))) {
    moveElement(gameState[x][y], gameState[emptyX][emptyY]);  
    let temp = gameState[x][y];
    gameState[x][y] = gameState[emptyX][emptyY];
    gameState[emptyX][emptyY] = temp;    
  }
}

const shuffle = () => {
  
  let shuffleX = Math.floor(Math.random()*4)
  let shuffleY = Math.floor(Math.random()*4)
  
  gameState.forEach((row, rowIndex) => {
    row.forEach((column, columnIndex) => {
      if (column.innerText === '') {
        emptyX = rowIndex;
        emptyY = columnIndex;
      }
    })
  })

  if (flagShuffle){  
    if (counterShuffling < 200) {
      if ((shuffleY === emptyY && (shuffleX + 1 === emptyX || shuffleX - 1 === emptyX)) || 
          (shuffleX === emptyX && (shuffleY + 1 === emptyY || shuffleY - 1 === emptyY))) {
          moveElement(gameState[shuffleX][shuffleY], gameState[emptyX][emptyY]);  
          
          let temp = gameState[shuffleX][shuffleY];
          gameState[shuffleX][shuffleY] = gameState[emptyX][emptyY];
          gameState[emptyX][emptyY] = temp;  
          counterShuffling++;    
      }
    }
  }
  
  lineShuffle.innerText = Math.floor(counterShuffling/2) + ' %'

  if (counterShuffling === 200){
    flagOverShuffling = true;
    counterShuffling = 201;
  }

  if (flagOverShuffling){
    flagOverShuffling = false;
    setTimeout(function() {alert('Gramy')}, 500)
  }
}

render(gameBoard, gameState);

setInterval((shuffle), 10)

btnStart.addEventListener('click', () => { 
  document.getElementById("line").animate([
    { left:'-360px', width: '80px'}, 
    { left:'0px', width: '800px' }
  ], { 
    duration: 12000,
    easing: 'linear',
    fill: "forwards",
  });
  flagShuffle = true;
});

gameBoard.addEventListener('click', (e) => {
  const target = e.target;
  
  gameState.forEach((row, rowIndex) => {
    row.forEach((column, columnIndex) => {
      if (column === target) {
        x = rowIndex;
        y = columnIndex;
      }
      if (column.innerText === '') {
        emptyX = rowIndex;
        emptyY = columnIndex;
      }
    })
  })

  ifCanMoving();

});