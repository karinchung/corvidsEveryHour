const { TwitterApi } = require('twitter-api-v2');

const twitterClient = new TwitterApi({
    appKey: process.env.API_KEY, // use a secret manager instead?
    appSecret: process.env.API_SECRET,
    accessToken: process.env.ACCESS_TOKEN,
    accessSecret: process.env.ACCESS_SECRET,
  }).readWrite

module.exports = { twitterClient }
