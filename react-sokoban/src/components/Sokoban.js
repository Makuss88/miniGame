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

  const moveHandler = () => {
    setCounter(counter + 1)
  }

  const counterText = "Counter " + counter;

  const leverNumber = "Level no. " + 1;

  return (
    <StyledSokobanWrapper >
      <StyledSokoban>
        <Stage moveHandler={moveHandler} />
        <aside>
          <div>
            <Display text={counterText} />
            <Display text={leverNumber} />
          </div>
          <StartButton onClick={clickHandle} />
        </aside>
      </StyledSokoban>
    </ StyledSokobanWrapper>
  );
};

export default Sokoban;