import axios from "axios";

// src/utils/api.ts
const API_URL = 'https://blogzers.vercel.app/api';
// const API_URL = 'http://localhost:5000/api';

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
    localStorage.removeItem('token');
    localStorage.removeItem('loginTime');
  },

  allblogs: async () => {
    const response = await axios.get(`${API_URL}/posts/`);
    return response.data;
  },

  getUser: async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await axios.get(`${API_URL}/users/getUser`, {
      headers: {
        Authorization: `Bearer ${token}`
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
    return response;
  },

  // Upload Image
  uploadImage: async (file: File) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("You must be logged in to upload images");

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${API_URL}/upload`, {
      method: "POST",
      body: formData,
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.json();
  },

  // Fetch User Images
  getUserImages: async () => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("You must be logged in to view images");

    const response = await fetch(`${API_URL}/images`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.json();
  },
};  