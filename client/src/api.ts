import axios from 'axios';

axios.defaults.baseURL =
  process.env.NODE_ENV === 'development'
    ? `${window.location.protocol}//${window.location.hostname}:8080/api/`
    : `api/`;

axios.defaults.headers.common['Content-Type'] = 'application/json';

const accessToken = localStorage.getItem('api_access_token');
if (accessToken) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
}
