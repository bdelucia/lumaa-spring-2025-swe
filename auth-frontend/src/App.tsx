import React, { useState } from 'react';
import AuthForm from './AuthForm';
import './App.css';

const App: React.FC = () => {
  const [authType, setAuthType] = useState<'login' | 'register'>('login');

  return (
    <div className="App">
      <div className="auth-container">
        <div className="auth-toggle">
          <button
            className={authType === 'login' ? 'active' : ''}
            onClick={() => setAuthType('login')}
          >
            Login
          </button>
          <button
            className={authType === 'register' ? 'active' : ''}
            onClick={() => setAuthType('register')}
          >
            Register
          </button>
        </div>
        <AuthForm type={authType} />
      </div>
    </div>
  );
};

export default App;
