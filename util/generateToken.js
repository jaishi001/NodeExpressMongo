const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../credentials/credentials");
async function generateToken({ email, password, user }) {
  console.log(SECRET_KEY);
  let token = null;
  const payload = {
    user,
  };
  const options = {
    expiresIn: "1h",
  };
  try {
    if (email !== user.email && password) {
      res.status(401).json({ msg: "Unauthtorized" });
    }
    token = await jwt.sign(payload, SECRET_KEY, options);
    return token;
  } catch (error) {
    console.log(error);
  }
}

module.exports = generateToken;
