import React, { useState, useEffect } from 'react';
import produce from 'immer';

import './styles/stage.css'


const WALL = "WALL";
const FLOOR = "FLOOR";
const BOX = "BOX";
const BOX_CLOSE = "BOX-CLOSE";
const GAMER = "GAMER";
const TARGET = 'TARGET';

const LEVELS = {
  id_1: {
    BOX: [{ id: 1, x: 2, y: 2 }, { id: 3, x: 2, y: 3 }, { id: 2, x: 2, y: 5 }],
    TARGET: [[1, 1], [3, 3], [3, 4]],
    WALL: [[2, 1], [2, 2], [3, 1], [3, 2], [3, 2], [4, 1], [4, 2], [4, 4]],
    GAMER: [1, 4],
    numRows: 8,
    numCols: 8
  },
}

const Stage = (props) => {
  const [gamerX, setGamerX] = useState(LEVELS.id_1.GAMER[0]);
  const [gamerY, setGamerY] = useState(LEVELS.id_1.GAMER[1]);

  const printBoard = () => {
    let board = new Array(LEVELS.id_1.numRows);
    for (let i = 0; i < LEVELS.id_1.numRows; i++) {
      board[i] = new Array(LEVELS.id_1.numCols);
      for (let j = 0; j < LEVELS.id_1.numCols; j++) {
        let cell = { type: FLOOR, gameDynamic: FLOOR };
        if (i === 0 || i === LEVELS.id_1.numRows - 1 || j === 0 || j === LEVELS.id_1.numCols - 1) {
          cell = { type: WALL };
        };
        board[i][j] = cell;
      };
    };
    printBox(board);
    printTarget(board);
    printWall(board);
    printGamer(board);
    return board;
  }
  const printGamer = (board) => {
    board[LEVELS.id_1.GAMER[0]][LEVELS.id_1.GAMER[1]] = { type: GAMER }
  }

  const printBox = (board) => {
    const print = (index) => {
      board[index.x][index.y] = { type: BOX }
    }
    LEVELS.id_1.BOX.forEach(print)
  }

  const printWall = (board) => {
    const print = (index) => {
      board[index[0]][index[1]] = { type: WALL }
    }
    LEVELS.id_1.WALL.forEach(print);
  }

  const printTarget = (board) => {
    const print = (index) => {
      board[index[0]][index[1]] = { type: TARGET }
    }
    LEVELS.id_1.TARGET.forEach(print);
  }

  const [winner, setWinner] = useState(0);

  const initialGame = printBoard()
  const [grid, setGrid] = useState(initialGame)

  const moveHandler = (i, k) => {
    const newGrid = produce(grid, gridCopy => {
      let iDiff = i - gamerX;
      let kDiff = k - gamerY;
      let iAbs = Math.abs(i - gamerX);
      let kAbs = Math.abs(k - gamerY);


      console.log("BOXY", LEVELS.id_1.BOX)
      console.log("CELE", LEVELS.id_1.TARGET)

      const sprawdzamBox = () => {
        let xBox = i + iDiff;
        let yBox = k + kDiff;
        let arrBox = [xBox, yBox];
        let stringBox = arrBox.toString();

        for (let i = 0; i < LEVELS.id_1.TARGET.length; i++) {
          let stringTarget = LEVELS.id_1.TARGET[i].toString();
          if (stringBox === stringTarget) {
            console.log('łączenie')
            console.log(xBox, yBox)
            gridCopy[xBox][yBox] = { type: BOX_CLOSE };
            console.log("WHYY")
            setWinner(winner + 1);
          } else {
            gridCopy[xBox][yBox] = { type: BOX };
            printTarget(gridCopy);
            console.log("nie łącznei")
          }
        }
      }

      if ((iAbs === 1 && kAbs === 0) || (kAbs === 1 && iAbs === 0)) {
        if (grid[i][k].type !== WALL) {
          let canMove = true;
          if (grid[i][k].type === BOX) {
            if (grid[i + iDiff][k + kDiff].type !== WALL &&
              (grid[i + iDiff][k + kDiff].type === FLOOR ||
                grid[i + iDiff][k + kDiff].type === TARGET)) {
              gridCopy[i][k] = { type: FLOOR };
              sprawdzamBox();
            } else {
              canMove = false
            }
          }
          if (canMove) {
            gridCopy[gamerX][gamerY] = { type: FLOOR }
            // printTarget(gridCopy);
            setGamerX(i)
            setGamerY(k)
            gridCopy[i][k] = { type: GAMER }
          }
        }
      }
    })
    setGrid(newGrid);
  };

  useEffect(() => {
    const moveByKey = (event) => {
      switch (event.keyCode) {
        case 37:
          props.moveHandler();
          moveHandler(gamerX, gamerY - 1);
          break;
        case 38:
          props.moveHandler();
          moveHandler(gamerX - 1, gamerY);
          break;
        case 39:
          props.moveHandler();
          moveHandler(gamerX, gamerY + 1);
          break;
        case 40:
          props.moveHandler();
          moveHandler(gamerX + 1, gamerY);
          break;
        default:
      };
    };
    window.addEventListener("keydown", moveByKey);
    return () => {
      window.removeEventListener("keydown", moveByKey);
      if (winner === LEVELS.id_1.TARGET.length) {
        setTimeout(() => {
          console.log("OKOK")
        }, 250)
      }
    };
  });

  const wrapperStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(' + LEVELS.id_1.numRows + ', 60px)',
  };

  return (
    <div style={wrapperStyle}>
      {
        grid.map((rows, i) =>
          rows.map((col, j) =>
            <div
              key={`${i}-${j}`}
              className={grid[i][j].type + " board"}
              onClick={() => moveHandler(i, j)}
            />)
        )
      }
    </div>
  );
};

export default Stage;