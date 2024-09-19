// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav>
            <button onClick={() => window.location.href="/login"}>Войти</button>
            <button onClick={() => window.location.href="/register"}>Зарегистрироваться</button>
          </nav>
        </header>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile firstName={''} lastName={''} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
