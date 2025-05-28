import axios from 'axios';

const API_BASE = 'http://127.0.0.1:8000/api';

export const getHomepageContent = async () => {
  const response = await axios.get(`${API_BASE}/homepage`);
  console.log('Homepage Content:', response.data);
  return response.data;
};