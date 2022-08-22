const caste = require("../../controllers/base_tables/caste");

const router = require("express").Router();

const {
  bodyRule,
  paramRule,
  updateRule,
} = require("../../validations/base_tables/caste");

const validate = require("../../validations/validate");

const { checkPermission } = require("../../middleware/permissions");

router.get("/", caste.index);
router.post("/", bodyRule(), validate, caste.create);
router.get("/:id/edit", paramRule(), validate, caste.edit);
router.put("/:id", updateRule(), validate, caste.update);
router.delete("/:id", paramRule(), validate, caste.delete);
router.get("/:id", paramRule(), validate, caste.show);

module.exports = router;
