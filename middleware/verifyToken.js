const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../credentials/credentials");

function verifyToken(req, res, next) {
  let token = req.header("authorization");
  if (!token) {
    return res.status(401).json({ msg: "Unauthorized!" });
  }

  if (!token.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "JWT Malformed!" });
  }
  token = token.slice(7, token.length).trimLeft();
  const decode = jwt.verify(token, SECRET_KEY);
  delete decode["user"]["password"];
  next();
}
module.exports = verifyToken;
