const axios = require("axios");
require("dotenv").config();

const apiClient = axios.create({
  baseURL: process.env.XTREAM_URL,
  timeout: 10000, // ✅ 10 seconds
  params: {
    username: process.env.XTREAM_USER,
    password: process.env.XTREAM_PASS,
  },
});

module.exports = apiClient;