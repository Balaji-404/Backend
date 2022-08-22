const userModel = require("../schema/users");
const { verify } = require("jsonwebtoken");

const checkPermission = (permission) => {
  return async (req, res, next) => {
    let token = req.headers.authorization;
    if (token) {
      token = token.split(" ")[1];
      if (token) {
        let decoded = verify(token, process.env.JWT_SECRET);
        req.user = decoded.email;
        const user = await userModel
          .findOne({ email: req.user })
          .populate("role", "name description permissions");
        if (user.role.permissions.includes(permission)) {
          next();
        } else {
          res.status(400).json({ status: "You dont have required Permission" });
        }
      } else {
        res.status(401).json({ message: "unathorized user" });
      }
    } else {
      res.status(401).json({ message: "unathorized user" });
    }
  };
};
module.exports = {
  checkPermission,
};
