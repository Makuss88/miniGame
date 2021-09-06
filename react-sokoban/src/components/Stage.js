import React, { useState, useEffect } from 'react';
import produce from 'immer';

import './styles/stage.css'

const WALL = "WALL";
const FLOOR = "FLOOR";
const BOX = "BOX";
const GAMER = "GAMER";
const TARGET = 'TARGET';

const LEVELS = {
  id_1: {
    BOX: [[1, 3], [2, 3]],
    TARGET: [[1, 1], [4, 3]],
    WALL: [[2, 1], [2, 2], [3, 1], [3, 2], [3, 4], [4, 1], [4, 2], [4, 4]],
    GAMER: [1, 4],
    numRows: 6,
    numCols: 6
  },
}

const Stage = () => {
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
    printGamer(board);
    printBox(board);
    printTarget(board);
    printWall(board);
    return board;
  }

  const printGamer = (board) => {
    board[LEVELS.id_1.GAMER[0]][LEVELS.id_1.GAMER[1]] = { type: FLOOR, gameDynamic: GAMER }
  }

  const printBox = (board) => {
    const print = (index) => {
      board[index[0]][index[1]] = { type: FLOOR, gameDynamic: BOX }
    }
    LEVELS.id_1.BOX.forEach(print);
  }

  const printWall = (board) => {
    const print = (index) => {
      board[index[0]][index[1]] = { type: WALL }
    }
    LEVELS.id_1.WALL.forEach(print);
  }

  const printTarget = (board) => {
    const print = (index) => {
      board[index[0]][index[1]] = { type: FLOOR, gameDynamic: TARGET, target: TARGET }
    }
    LEVELS.id_1.TARGET.forEach(print);
  }

  const initialGame = printBoard()
  const [grid, setGrid] = useState(initialGame)

  const moveHandler = (i, k) => {
    const newGrid = produce(grid, gridCopy => {
      let iDiff = i - gamerX;
      let kDiff = k - gamerY;
      let iAbs = Math.abs(i - gamerX);
      let kAbs = Math.abs(k - gamerY);

      if ((iAbs === 1 && kAbs === 0) || (kAbs === 1 && iAbs === 0)) {
        if (grid[i][k].type !== WALL) {
          let canMove = true;
          if (grid[i][k].gameDynamic === BOX) {
            if (grid[i + iDiff][k + kDiff].type !== WALL && grid[i + iDiff][k + kDiff].type === FLOOR) {
              gridCopy[i][k] = { type: FLOOR, gameDynamic: FLOOR };
              gridCopy[i + iDiff][k + kDiff] = { type: FLOOR, gameDynamic: BOX };
            } else {
              canMove = false
            }
          }
          if (canMove) {
            gridCopy[gamerX][gamerY] = { type: FLOOR, gameDynamic: FLOOR }
            // printTarget(gridCopy)
            setGamerX(i)
            setGamerY(k)
            gridCopy[i][k] = { type: FLOOR, gameDynamic: GAMER }
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
          moveHandler(gamerX, gamerY - 1);
          break;
        case 38:
          moveHandler(gamerX - 1, gamerY);
          break;
        case 39:
          moveHandler(gamerX, gamerY + 1);
          break;
        case 40:
          moveHandler(gamerX + 1, gamerY);
          break;
        default:
          console.log(event.key)
      };
    };
    window.addEventListener("keydown", moveByKey);
    return () => {
      window.removeEventListener("keydown", moveByKey);
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
              className={grid[i][j].type + " " + grid[i][j].gameDynamic + " board"}
              onClick={() => moveHandler(i, j)}
            />)
        )
      }
    </div >
  );
};

export default Stage;