const jwt = require("jsonwebtoken");
const { REFRESH_TOKEN_SECRET_KEY } = require("../credentials/credentials");
const redisClient = require("../util/redis");

async function verifyRefreshToken({ refreshToken }) {
  try {
    const payload = await jwt.verify(refreshToken, REFRESH_TOKEN_SECRET_KEY);

    const tokenInRedis = await redisClient.GET(payload.id);
    if (tokenInRedis === refreshToken) {
      return payload.id;
    } else {
      return console.log("Unauthorized");
    }
  } catch (error) {
    console.log(error.message);
  }
}
module.exports = verifyRefreshToken;
