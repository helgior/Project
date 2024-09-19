import React from 'react';
import Login from './Login';
import Register from './Register';

const Auth = ({ isLogin }: { isLogin: boolean }) => {
  return (
    <div>
      {isLogin ? <Login /> : <Register />}
    </div>
  );
};

export default Auth;
