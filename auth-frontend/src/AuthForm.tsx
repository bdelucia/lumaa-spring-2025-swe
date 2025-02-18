import React, { useState } from 'react';
import axios from 'axios';
import { AuthFormProps } from './types/auth';

const API_URL = 'http://localhost:3001'; // Define base URL

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('Attempting to', type, 'with username:', username);

      // Proceed with registration/login
      const response = await axios.post(`${API_URL}/auth/${type}`, {
        username,
        password,
      });

      console.log('Response:', response.data);

      if (response.data.success) {
        setMessage(
          `${type === 'login' ? 'Logged in' : 'Registered'} successfully!`
        );
        setUsername('');
        setPassword('');
      }
    } catch (error) {
      console.error('Error details:', error);
      if (axios.isAxiosError(error)) {
        setMessage(error.response?.data?.message || `Error: ${error.message}`);
      } else {
        setMessage('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="auth-form">
      <h2>{type === 'login' ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">{type === 'login' ? 'Login' : 'Register'}</button>
      </form>
      {message && (
        <p
          style={{ color: message.includes('successfully') ? 'green' : 'red' }}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default AuthForm;
