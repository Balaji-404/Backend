const skillcategory = require("../../controllers/base_tables/skillcategory");

const router = require("express").Router();

const {
  bodyRule,
  paramRule,
  updateRule,
} = require("../../validations/base_tables/skillcategory");

const validate = require("../../validations/validate");

const { checkPermission } = require("../../middleware/permissions");

router.get("/", skillcategory.index);
router.post("/", bodyRule(), validate, skillcategory.create);
router.get("/:id/edit", paramRule(), validate, skillcategory.edit);
router.put("/:id", updateRule(), validate, skillcategory.update);
router.delete("/:id", paramRule(), validate, skillcategory.delete);
router.get("/:id", paramRule(), validate, skillcategory.show);

module.exports = router;
