import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_KLASSMATE_API_BASE_URL,
});

export const getNote = (id) => {
  return instance.get(`/notes/${id}`).then((res) => res.data);
};

export default instance;
