import React from 'react';

import Sokoban from './components/Sokoban';

const App = () => {
  const onKeyUp = () => {
    console.log('OK??');
  };

  return (
    <div className="container" onKeyPress={onKeyUp} >
      <Sokoban />
    </div>
  );
}

export default App;
