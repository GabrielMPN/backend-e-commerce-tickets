const axios = require('axios');
require('dotenv').config();

const api = axios.create({ 
    baseURL: `http://${BASE_URL_GATEWAY}/ingressos`,
    auth: {
        username: 'admin',
        password: 'laranja22'
      },
});

module.exports = api;

