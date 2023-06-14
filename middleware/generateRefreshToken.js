const jwt = require("jsonwebtoken");
const { REFRESH_TOKEN_SECRET_KEY } = require("../credentials/credentials");

async function generateRefreshToken({ user }) {
  try {
    const payload = {
      id: user,
    };
    const options = {
      expiresIn: "1y",
    };
    const token = await jwt.sign(payload, REFRESH_TOKEN_SECRET_KEY, options);
    return token;
  } catch (error) {
    console.log(error.message);
  }
}
module.exports = generateRefreshToken;
