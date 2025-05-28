import axios from 'axios';

export const fetchHomeContent = async () => {
  const res = await axios.get('http://127.0.0.1:8000/api/home-content');
  return res.data;
};
