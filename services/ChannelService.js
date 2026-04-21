const axios = require("axios");
const { log } = require("node:console");
require("dotenv").config();

const BASE_URL = process.env.XTREAM_URL;

const params = {
  username: process.env.XTREAM_USER,
  password: process.env.XTREAM_PASS
};

const getAllChannels = async () => {
 const channels = [];
  const res = await axios.get(BASE_URL, {
    params: { ...params, action: "get_live_categories" }
  });
  log(res.data)

  return res.data; // ✅ return only data
};

module.exports = { getAllChannels };