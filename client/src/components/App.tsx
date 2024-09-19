import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Auth from './Auth';

const App = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div>
      <Header setIsLogin={setIsLogin} />
      <Auth isLogin={isLogin} />
      <Footer />
    </div>
  );
};

export default App;
