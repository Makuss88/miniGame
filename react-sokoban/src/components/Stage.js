import React, { useState } from 'react';

import './styles/stage.css'

const numRows = 8;
const numCols = 8;
const WALL = "WALL";
const FLOOR = "FLOOR";

const Stage = ({ gamer }) => {

  const [grid, setGrid] = useState(() => {
    let board = new Array(8);
    for (let i = 0; i < numRows; i++) {
      board[i] = new Array(8);
      for (let j = 0; j < numCols; j++) {
        let cell = { type: FLOOR };
        if (i === 0 || i === numRows - 1 || j === 0 || j === numCols - 1) {
          cell = { type: WALL };
        }

        board[i][j] = cell;
      };
    }

    board[gamer.posX][gamer.posY] = { type: gamer.name }
    return board;
  })

  const clickHandle = (i, k) => {
    // e.preventDefault();
    grid[i][k] = { type: gamer.name };
    grid[gamer.posX][gamer.posY] = { type: FLOOR };

    console.log("okd4")
  }

  return (
    <div className={'wrapper'}>
      {
        grid.map((rows, i) =>
          rows.map((col, k) =>
            <div
              key={`${i}-${k}`}
              className={grid[i][k].type + " board"}
              onClick={() => clickHandle(i, k)}
            />)
        )
      }
    </div >
  )
};

export default Stage;