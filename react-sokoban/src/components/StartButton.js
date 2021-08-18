import React from "react";

import { StyledStartButton } from './styles/StyledStartButton';

const StartButton = ({ onClick }) => {

  return (
    <StyledStartButton onClick={onClick}>
      START MY GAME!
    </StyledStartButton>
  );
}

export default StartButton;