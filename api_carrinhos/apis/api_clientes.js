const axios = require('axios');
require('dotenv').config();

const api = axios.create({ 
    baseURL: `http://${process.env.BASE_URL_GATEWAY}/clientes`,
    auth: {
        username: 'admin',
        password: 'laranja22'
      },
});

module.exports = api;