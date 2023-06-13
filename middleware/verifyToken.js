const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../credentials/credentials");

function verifyToken(req, res, next) {
  let token = req.header("authorization");
  if (!token) {
    return res.status(401).json({ msg: "No authoriation token found!" });
  }

  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length).trimLeft();
  }
  console.log(token, "\n");

  const decode = jwt.verify(token, SECRET_KEY);
  delete decode["user"]["password"];
  console.log(decode);
  next();
}
module.exports = verifyToken;
