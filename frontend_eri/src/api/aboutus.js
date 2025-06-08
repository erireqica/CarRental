import axios from 'axios';

const API_BASE = 'http://127.0.0.1:8000/api';

export const getAboutUsContent = () => {
  return axios.get(`${API_BASE}/about-us`);
};

export const updateAboutUsContent = (data) => {
  return axios.put(`${API_BASE}/about-us`, data);
};
