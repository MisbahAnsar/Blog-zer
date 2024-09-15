// src/utils/api.ts
const API_URL = 'http://localhost:5000/api';

export const api = {
  signup: async (data: { username: string; email: string; password: string }) => {
    const response = await fetch(`${API_URL}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },
  login: async (data: { email: string; password: string }) => {
    const response = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (result.token) {
      localStorage.setItem('token', result.token); // Store token
      localStorage.setItem('loginTime', new Date().toISOString()); // Store login time
    }
    return result;
  },
  logout: () => {
    localStorage.removeItem('token'); // Remove token
    localStorage.removeItem('loginTime'); // Remove login time
  }
};
