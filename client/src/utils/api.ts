import axios from "axios";

// src/utils/api.ts
const API_URL = 'https://blogzer69.vercel.app';

export const api = {

  signup: async (data: { username: string; email: string; password: string }) => {
    const response = await fetch(`${API_URL}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include',
    });
    return response.json();
  },
  
  login: async (data: { email: string; password: string }) => {
    const response = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include',
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
  },

  allblogs: async () => {
    const response = await axios.get(`${API_URL}/posts/`);
    return response.data;
  },

  getUser: async () => {
    const token = localStorage.getItem('token');
    console.log("token rusing:", token);
    if (!token) {
      throw new Error('No token found');
    }

    const response = await axios.get(`${API_URL}/users/getUser`, {
      headers: {
        Authorization: `Bearer ${token}`  // Include the token in request headers
      }
    });
    return response.data;
  },

  createPost: async (data: { title: string, content: string }) => {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_URL}/posts/create`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  },

  getUserPosts: async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/posts/myposts`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response)
    return response;
  }
};  