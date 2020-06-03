const jwt = require("jsonwebtoken");
const config = require("../utils/config");

module.exports = (req, res, next) => {
  const token = req.header("auth-token");
  console.log(token);
  if (!token) return res.status(401).send("Access denied!");

  try {
    const verified = jwt.verify(token, config.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send("Invalid token");
  }
};
