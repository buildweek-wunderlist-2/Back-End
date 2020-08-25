const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  const secret = process.env.JWT_SECRET || "keep it secret, keep it safe";

  if (token) {
    jwt.verify(token, secret, (error, decodedToken) => {
      if (error) {
        console.log(secret)
        console.log(error)
        res.status(401).json({ you: "cannot not pass!" });
      } else {
        req.decodedToken = decodedToken;

        next();
      }
    });
  } else {
    res.status(401).json({ message: "Please provide credentials" });
  }
};
