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
    BOX: [[3, 2], [3, 3], [2, 4], [4, 5]],
    TARGET: [[3, 1], [3, 5], [4, 3], [5, 3]],
    WALL: [[1, 3], [4, 2], [4, 4], [2, 5], [4, 6], [5, 6]],
    GAMER: [1, 6],
    numRows: 7,
    numCols: 8
  },
}

const Stage = () => {

  useEffect(() => {
    const dupa = (event) => {
      // console.log(event.key)
    };
    window.addEventListener("keydown", dupa)
    return () => {
      window.removeEventListener("keydown", dupa)
    }
  }, []);

  const [gamerX, setGamerX] = useState(LEVELS.id_1.GAMER[0]);
  const [gamerY, setGamerY] = useState(LEVELS.id_1.GAMER[1]);

  const printBoard = () => {
    let board = new Array(8);
    for (let i = 0; i < LEVELS.id_1.numRows; i++) {
      board[i] = new Array(8);
      for (let j = 0; j < LEVELS.id_1.numCols; j++) {
        let cell = { type: FLOOR };
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
    board[LEVELS.id_1.GAMER[0]][LEVELS.id_1.GAMER[1]] = { type: GAMER }
  }

  const printBox = (board) => {
    const print = (index) => {
      board[index[0]][index[1]] = { type: BOX }
    }
    LEVELS.id_1.BOX.forEach(print);
  }

  const printTarget = (board) => {
    const print = (index) => {
      board[index[0]][index[1]] = { type: WALL }
    }
    LEVELS.id_1.WALL.forEach(print);
  }

  const printWall = (board) => {
    const print = (index) => {
      board[index[0]][index[1]] = { type: TARGET }
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
          if (grid[i][k].type === BOX) {
            if (grid[i + iDiff][k + kDiff].type !== WALL && grid[i + iDiff][k + kDiff].type !== BOX) {
              gridCopy[i][k] = { type: GAMER };
              gridCopy[i + iDiff][k + kDiff] = { type: BOX };
            } else {
              canMove = false
            }
          }
          if (canMove) {
            gridCopy[i][k] = { type: GAMER }
            gridCopy[gamerX][gamerY] = { type: FLOOR }
            setGamerX(i)
            setGamerY(k)
          }
        }
      }
    })
    setGrid(newGrid)
  }


  return (
    <div className={'wrapper'}>
      {
        grid.map((rows, i) =>
          rows.map((col, k) =>
            <div
              key={`${i}-${k}`}
              className={grid[i][k].type + " board"}
              onClick={() => moveHandler(i, k)}
            />)
        )
      }
    </div >
  )
};

export default Stage;