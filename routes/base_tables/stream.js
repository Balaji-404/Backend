const stream = require("../../controllers/base_tables/stream");

const router = require("express").Router();

const {
  bodyRule,
  paramRule,
  updateRule,
} = require("../../validations/base_tables/stream");

const validate = require("../../validations/validate");

const { checkPermission } = require("../../middleware/permissions");

router.get("/", stream.index);
router.post("/", bodyRule(), validate, stream.create);
router.get("/:id/edit", paramRule(), validate, stream.edit);
router.put("/:id", updateRule(), validate, stream.update);
router.delete("/:id", paramRule(), validate, stream.delete);
router.get("/:id", paramRule(), validate, stream.show);

module.exports = router;
