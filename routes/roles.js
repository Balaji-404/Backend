const router = require("express").Router();

const roles = require("../controllers/role")

router.get("/", roles.index);

module.exports = router;
