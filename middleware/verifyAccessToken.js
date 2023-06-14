const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET_KEY } = require("../credentials/credentials");

function verifyAccessToken(req, res, next) {
  try {
    let token = req.header("authorization");
    if (!token) {
      return res.status(401).json({ msg: "Unauthorized!" });
    }

    if (!token.startsWith("Bearer ")) {
      return res.status(401).json({ msg: "JWT Malformed!" });
    }
    token = token.slice(7, token.length).trimLeft();
    const decode = jwt.verify(token, ACCESS_TOKEN_SECRET_KEY);
    req.user = decode.id;
    next();
  } catch (error) {
    console.log(error.message);
  }
}
module.exports = verifyAccessToken;
