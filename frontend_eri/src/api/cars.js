import axios from 'axios';

const API_BASE = 'http://127.0.0.1:8000/api';

export const getCars = async () => {
  const response = await axios.get(`${API_BASE}/cars`);
  return response.data;
};