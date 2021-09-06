import React, { useState } from 'react';

import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';

import { StyledSokoban, StyledSokobanWrapper } from './styles/StyledSokoban';

const Sokoban = () => {

  const clickHandle = () => {
    window.location.reload();
  }

  const [counter, setCounter] = useState(0);
  // setCounter(1);
  const counterText = "Counter " + counter;

  return (
    <StyledSokobanWrapper >
      <StyledSokoban>
        <Stage />
        <aside>
          <div>
            <Display text={counterText} />
            <Display text="Level" />
          </div>
          <StartButton onClick={clickHandle} />
        </aside>
      </StyledSokoban>
    </ StyledSokobanWrapper>
  );
};

export default Sokoban;