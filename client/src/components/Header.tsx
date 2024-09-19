import React from 'react';

const Header = ({ setIsLogin }: { setIsLogin: (value: boolean) => void }) => {
  return (
    <header>
      <button onClick={() => setIsLogin(true)}>Войти</button>
      <button onClick={() => setIsLogin(false)}>Зарегистрироваться</button>
    </header>
  );
};

export default Header;
