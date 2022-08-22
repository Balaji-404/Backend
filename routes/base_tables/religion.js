const religion = require("../../controllers/base_tables/religion");

const router = require("express").Router();

const {
  bodyRule,
  paramRule,
  updateRule,
} = require("../../validations/base_tables/religion");

const validate = require("../../validations/validate");

const { checkPermission } = require("../../middleware/permissions");

router.get("/", religion.index);
router.post("/", bodyRule(), validate, religion.create);
router.get("/:id/edit", paramRule(), validate, religion.edit);
router.put("/:id", updateRule(), validate, religion.update);
router.delete("/:id", paramRule(), validate, religion.delete);
router.get("/:id", paramRule(), validate, religion.show);

module.exports = router;
