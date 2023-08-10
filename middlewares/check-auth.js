const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../keys/keys");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).send({ message: "Authentication failed" });
  }
};
