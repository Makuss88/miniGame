const WALL = "WALL";
const FLOOR = "FLOOR";
const TARGET = "TARGET";
const GAMER = "GAMER";
const BOX = "BOX";

let gGamerPos = { i: 5, j: 4 } // position of gamer

let board = new Array(8);

const buildBoard = () => {
  for (let i = 0; i < board.length; i++) {
    board[i] = new Array(8);
    for (let j = 0; j < board[i].length; j++) {
      let cell = { type: FLOOR, gameElement: null }
      if (i === 0 || i === board.length - 1 || j === 0 || j === board[0].length - 1) {
        cell.type = WALL
      };
      board[i][j] = cell
    };
  };
  board[gGamerPos.i][gGamerPos.j].gameElement = GAMER; // place gamer => now by gGamePos
  positionOfTarget();
  positionOfBox();
  return board;
};

const positionOfBox = () => {
  board[2][2].gameElement = BOX; //place box
  board[3][4].gameElement = BOX; //place box
}

const positionOfTarget = () => {
  board[2][4].type = TARGET; //place target
  board[4][2].type = TARGET; //place target
}

const printBoard = () => {
  let table = document.getElementById('gameTable');
  let strHTML = '';
  for (let i = 0; i < gBoard.length; i++) {
    strHTML += `<tr style="border: 2px solid black">`
    for (let j = 0; j < gBoard[i].length; j++) {
      let currCell = gBoard[i][j];
      let cellClass = '';
      if (currCell.type === FLOOR) {
        cellClass = "floor";
      }
      else if (currCell.type === TARGET) {
        cellClass = "target";
      }
      else if (currCell.type === WALL) {
        cellClass = "wall";
      }
      strHTML += "<td class='cell " + cellClass + "' onclick='clickHandle(" + i + "," + j + ")'>"

      if (currCell.gameElement === GAMER) {
        strHTML += "<img src='img/ang.png'>"
      } else if (currCell.gameElement === BOX) {
        strHTML += "<img src='img/box.png'>"
      }
      strHTML += "</td>"
    }
    strHTML += "</tr>"
  }
  table.innerHTML = strHTML;
}

const clickHandle = (i, j) => {
  let iDiff = i - gGamerPos.i;
  let jDiff = j - gGamerPos.j;
  let iAbs = Math.abs(i - gGamerPos.i);
  let jAbs = Math.abs(j - gGamerPos.j);

  if ((iAbs === 1 && jAbs === 0) || (jAbs === 1 && iAbs === 0)) {
    if (gBoard[i][j].type != WALL) {
      let canMove = true;
      if (gBoard[i][j].gameElement === BOX) {
        if (gBoard[i + iDiff][j + jDiff].type != WALL && gBoard[i + iDiff][j + jDiff].gameElement == null) {
          gBoard[i][j].gameElement = null;
          gBoard[i + iDiff][j + jDiff].gameElement = BOX;
        } else {
          canMove = false;
        }
      }
      if (canMove) {
        gBoard[gGamerPos.i][gGamerPos.j].gameElement = null;
        gGamerPos.i = i;
        gGamerPos.j = j;
        gBoard[gGamerPos.i][gGamerPos.j].gameElement = GAMER;
      }
    }
  }
  printBoard();
}

const keyHandle = (event) => {
  switch (event.keyCode) {
    case 37:
      clickHandle(gGamerPos.i, gGamerPos.j - 1)
      break;
    case 38:
      clickHandle(gGamerPos.i - 1, gGamerPos.j)
      break;
    case 39:
      clickHandle(gGamerPos.i, gGamerPos.j + 1)
      break;
    case 40:
      clickHandle(gGamerPos.i + 1, gGamerPos.j)
      break;
  }
};

const gBoard = buildBoard();