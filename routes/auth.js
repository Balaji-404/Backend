const user = require("../controllers/user");

const router = require("express").Router();

const { registrationRule, loginRule } = require("../validations/user");
const validate = require("../validations/validate");

router.post("/register", registrationRule(), validate, user.register);
router.post("/login", loginRule(), validate, user.login);
router.post("/verifyOtp", user.verifyOtp);
router.post("/sendResetOtp", user.sendResetOtp);
router.post("/resetPassword", user.resetPassword);
router.post("/login", loginRule(), validate, user.login);
router.get("/verify", user.verifyUser);

module.exports = router;
