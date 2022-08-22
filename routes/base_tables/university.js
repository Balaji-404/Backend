const university = require("../../controllers/base_tables/university");

const router = require("express").Router();

const {
  bodyRule,
  paramRule,
  updateRule,
} = require("../../validations/base_tables/university");

const validate = require("../../validations/validate");

const { checkPermission } = require("../../middleware/permissions");

router.get("/", university.index);
router.post("/", bodyRule(), validate, university.create);
router.get("/:id/edit", paramRule(), validate, university.edit);
router.put("/:id", updateRule(), validate, university.update);
router.delete("/:id", paramRule(), validate, university.delete);
router.get("/:id", paramRule(), validate, university.show);

module.exports = router;
