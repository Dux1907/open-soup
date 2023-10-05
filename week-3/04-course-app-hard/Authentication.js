const jwt = require("jsonwebtoken");
require('dotenv').config()
const key = process.env.SECRETKEY;
const authentication = (req, res, next) => {
  const randomString = req.headers.authorization;
  if (randomString) {
      const token = randomString.split(" ")[1];
      
    jwt.verify(token, key, function (err, user) {
      if (err) 
        return res.status(403).send();
      if (user.role == "admin") req.IsAdmin = true;
      else req.IsUser = true;
      req.user = user;
      next();
    });
  } else res.status(401).send();
};

module.exports = authentication;
