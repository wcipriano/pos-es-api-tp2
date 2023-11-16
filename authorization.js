require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
const jwt = require("jsonwebtoken");

class Authorization {
  get_jwt_token(user_data) {
    return jwt.sign(user_data, process.env.SECRET_KEY, {
      expiresIn: 3600,
    });
  }

  check_token(req, res, next) {
    let authToken = req.headers["authorization"];
    if (!authToken) {
      const resp = { auth: false, message: "No token provided." };
      return res.status(401).json(resp);
    }
    const token = authToken.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (!err) {
        req.userId = decoded.id;
        req.roles = decoded.roles;
        next();
      } else
        return res.status(401).json({ auth: false, message: "Invalid token." });
    });
  }

  check_admin(req, res, next) {
    const arr = req.roles.split(";");
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].indexOf("ADMIN") != -1) return next();
    }
    return res.status(401).json({ auth: false, message: "Access denied." });
  }
}

module.exports = Authorization;
