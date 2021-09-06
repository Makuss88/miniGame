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
  const [gamerX, setGamerX] = useState(LEVELS.id_1.GAMER[0]);
  const [gamerY, setGamerY] = useState(LEVELS.id_1.GAMER[1]);
  const [tarX, setTarX] = useState();
  const [tarY, setTarY] = useState();
  const [targ, setTarg] = useState(false);


  const printBoard = () => {
    let board = new Array(8);
    for (let i = 0; i < LEVELS.id_1.numRows; i++) {
      board[i] = new Array(8);
      for (let j = 0; j < LEVELS.id_1.numCols; j++) {
        let cell = { type: FLOOR, gameDynamic: FLOOR };
        if (i === 0 || i === LEVELS.id_1.numRows - 1 || j === 0 || j === LEVELS.id_1.numCols - 1) {
          cell = { type: WALL };
        };
        board[i][j] = cell;
      };
    };
    printGamer(board);
    // printBox(board);
    printTarget(board);
    // printWall(board);
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
            if (targ) {
              console.log("taryyy", tarX, tarY)
              gridCopy[i - iDiff][k - kDiff] = { type: FLOOR, gameDynamic: TARGET }
              console.log(gridCopy[tarX][tarY].gameDynamic)
              setTarg(false)
            }
            if (gridCopy[i][k].gameDynamic === TARGET) {
              setTarg(true)
              setTarX(i);
              setTarY(k);
              gridCopy[i][k] = { type: FLOOR, gameDynamic: FLOOR }
              console.log("po targecie")
            }
            gridCopy[gamerX][gamerY] = { type: FLOOR, gameDynamic: FLOOR }
            setGamerX(i)
            setGamerY(k)
            gridCopy[i][k] = { type: FLOOR, gameDynamic: GAMER }
          }
        }
      }
    })
    setGrid(newGrid)
  }


  useEffect(() => {
    const dupa = (event) => {
      switch (event.keyCode) {
        case 37:
          moveHandler(gamerX, gamerY - 1)
          // console.log("lewo", gamerX, gamerY)
          break;
        case 38:
          moveHandler(gamerX - 1, gamerY)
          // console.log("gora", gamerX, gamerY)
          break;
        case 39:
          moveHandler(gamerX, gamerY + 1)
          // console.log("prawo", gamerX, gamerY)
          break;
        case 40:
          moveHandler(gamerX + 1, gamerY)
          // console.log("dol", gamerX + 1, gamerY)
          break;
        default:
          console.log(event.key)
      }
    };
    window.addEventListener("keydown", dupa)
    return () => {
      window.removeEventListener("keydown", dupa)
    }
  });


  return (
    <div className={'wrapper'}>
      {
        grid.map((rows, i) =>
          rows.map((col, k) =>
            <div
              key={`${i}-${k}`}
              className={grid[i][k].type + " " + grid[i][k].gameDynamic + " board"}
              onClick={() => moveHandler(i, k)}
            />)
        )
      }
    </div >
  )
};

export default Stage;