import axios from 'axios';

const API_URL = 'http://localhost:5000/api';  // Adjust based on backend URL

// Axios instance to handle API requests
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Example of a request to add an offender
export const addOffender = async (offenderData, token) => {
  try {
    const response = await api.post('/offenders/add', offenderData, {
      headers: {
        Authorization: token,  // Pass the token here
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding offender:', error);
    throw error;
  }
};

// Other API functions can be added similarly

export default api;
