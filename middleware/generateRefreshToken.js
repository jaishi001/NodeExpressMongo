const jwt = require("jsonwebtoken");
const { REFRESH_TOKEN_SECRET_KEY } = require("../credentials/credentials");
const redisClient = require("../util/redis");

async function generateRefreshToken({ user }) {
  try {
    const payload = {
      id: user,
    };
    const options = {
      expiresIn: "1y",
    };
    const token = await jwt.sign(payload, REFRESH_TOKEN_SECRET_KEY, options);

    await redisClient.SET(user?.toString(), token, {
      EX: 365 * 24 * 60 * 60,
    });
    return token;
  } catch (error) {
    console.log(error.message);
  }
}
module.exports = generateRefreshToken;
