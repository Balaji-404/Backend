const { body } = require("express-validator");

const { errorMessages } = require("../lang/messages.json");

const registrationRule = () => {
  return [
    body("email", errorMessages.emailRequired).exists(),
    body("password", errorMessages.passwordRequired).exists(),
    body("password", errorMessages.passwordLength).isLength({ min: 6 }),
    body("password", errorMessages.passwordType).isAlphanumeric(),
    body("firstName", errorMessages.firstNameRequired).exists(),
    body("lastName", errorMessages.lastNameRequired).exists(),
    body("mobile", errorMessages.mobileRequired).exists(),
    body("gender", errorMessages.genderRequired).exists(),
    body("dob", errorMessages.dobRequired).exists(),
  ];
};

const loginRule = () => {
  return [
    body("email", errorMessages.emailRequired).exists(),
    body("password", errorMessages.passwordRequired).exists(),
    body("password", errorMessages.passwordLength).isLength({ min: 6 }),
    body("password", errorMessages.passwordType).isAlphanumeric(),
  ];
};

module.exports = {
  registrationRule,
  loginRule,
};
