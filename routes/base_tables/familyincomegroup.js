const familyincomegroup = require("../../controllers/base_tables/familyincomegroup");

const router = require("express").Router();

const {
  bodyRule,
  paramRule,
  updateRule,
} = require("../../validations/base_tables/familyincomegroup");

const validate = require("../../validations/validate");

const { checkPermission } = require("../../middleware/permissions");

router.get("/", familyincomegroup.index);
router.post("/", bodyRule(), validate, familyincomegroup.create);
router.get("/:id/edit", paramRule(), validate, familyincomegroup.edit);
router.put("/:id", updateRule(), validate, familyincomegroup.update);
router.delete("/:id", paramRule(), validate, familyincomegroup.delete);
router.get("/:id", paramRule(), validate, familyincomegroup.show);

module.exports = router;
