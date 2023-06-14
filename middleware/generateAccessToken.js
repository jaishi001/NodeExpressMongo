const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET_KEY } = require("../credentials/credentials");
async function generateToken({ user }) {
  let token = null;
  const payload = {
    id: user,
  };
  const options = {
    expiresIn: "30s",
  };
  try {
    token = await jwt.sign(payload, ACCESS_TOKEN_SECRET_KEY, options);
    return token;
  } catch (error) {
    console.log(error);
  }
}

module.exports = generateToken;
