import React from 'react';

import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';

import { StyledSokoban, StyledSokobanWrapper } from './styles/StyledSokoban';

const Sokoban = () => {
  const GAMER = {
    name: 'GAMER',
    posX: 2,
    posY: 3
  }

  const clickHandle = () => {
    console.log("start game")
  }

  return (
    <StyledSokobanWrapper >
      <StyledSokoban>
        <Stage gamer={GAMER} />
        <aside>
          <div>
            <Display text="Counter" />
            <Display text="Level" />
          </div>
          <StartButton onClick={clickHandle} />
        </aside>
      </StyledSokoban>
    </ StyledSokobanWrapper>
  );
};

export default Sokoban;