import styled from 'styled-components';

import bgImage from '../../img/bg.jpg';

export const StyledSokobanWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: url(${bgImage}) #000;
  background-size: cover;
  overflow: hidden;
`;

export const StyledSokoban = styled.div`
    display: flex;           
    // flex-direction: column;  
    justify-content: center; 
    align-items: center;    
    padding: 100px 0;
  aside {
    width: 100%;
    max-width: 200px;
    padding: 0 20px;
  }
`;