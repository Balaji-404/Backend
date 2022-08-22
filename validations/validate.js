const { validationResult } = require("express-validator");

const { errorMessage } = require("../controllers/message");

module.exports = (req, res, next) => {
  let errors = validationResult(req);
  if (errors.isEmpty()) next();
  else errorMessage(res, errors);
};
