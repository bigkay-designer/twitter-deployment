import axios from 'axios';

// All url will start with the one below
const instance = axios.create({
  // baseURL: 'https://twitter-clone.xyz/',
  baseURL: 'http://localhost:3001/',
});

export default instance;
