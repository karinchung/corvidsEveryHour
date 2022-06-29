require('dotenv').config();
const { TwitterApi } = require('twitter-api-v2');

const {
  API_KEY,
  API_SECRET,
  ACCESS_TOKEN,
  ACCESS_SECRET
} = process.env;

const twitterClient = new TwitterApi({
    appKey: API_KEY,
    appSecret: API_SECRET,
    accessToken: ACCESS_TOKEN,
    accessSecret: ACCESS_SECRET,
  }).readWrite

module.exports = { twitterClient }
