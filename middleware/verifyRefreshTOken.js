const jwt = require("jsonwebtoken");
const { REFRESH_TOKEN_SECRET_KEY } = require("../credentials/credentials");

async function verifyRefreshToken({ refreshToken }) {
  try {
    const payload = await jwt.verify(refreshToken, REFRESH_TOKEN_SECRET_KEY);
    return payload.id;
  } catch (error) {
    console.log(error.message);
  }
}
module.exports = verifyRefreshToken;
