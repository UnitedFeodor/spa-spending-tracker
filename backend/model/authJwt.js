const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");

verifyToken = (req, res, next) => {
  console.log("verifyToken ")
  console.log("req.headers[\"x-access-token\"]",req.headers["x-access-token"])

  let token = req.headers["x-access-token"];

  if (!token) {
    console.log("verifyToken err no token 401 response")
    return res.status(401).send({ message: "No access token!"});
  }
  
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      console.log("verifyToken err not verified 401 response")
      return res.status(401).send({ message: "Unauthorized!" });
    }
      
    req.userId = decoded.id;
    next();
  });
};

const authJwt = {
    verifyToken
  };
  module.exports = authJwt;