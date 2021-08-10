import React from 'react';

import Header from './components/Header/Header';
import MainSection from './components/MainSection/MainSection';
import Footer from './components/Footer/Footer';

const App = () => {
  return (
    <div className="container">
      <Header />
      <MainSection />
      <Footer />
    </div>
  );
}

export default App;
