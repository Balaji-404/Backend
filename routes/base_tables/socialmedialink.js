const socialmedialink = require("../../controllers/base_tables/socialmedialink");

const router = require("express").Router();

const {
  bodyRule,
  paramRule,
  updateRule,
} = require("../../validations/base_tables/socialmedialink");

const validate = require("../../validations/validate");

const { checkPermission } = require("../../middleware/permissions");

router.get("/", socialmedialink.index);
router.post("/", bodyRule(), validate, socialmedialink.create);
router.get("/:id/edit", paramRule(), validate, socialmedialink.edit);
router.put("/:id", updateRule(), validate, socialmedialink.update);
router.delete("/:id", paramRule(), validate, socialmedialink.delete);
router.get("/:id", paramRule(), validate, socialmedialink.show);

module.exports = router;
