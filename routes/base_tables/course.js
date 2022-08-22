const course = require("../../controllers/base_tables/course");

const router = require("express").Router();

const {
  bodyRule,
  paramRule,
  updateRule,
} = require("../../validations/base_tables/course");

const validate = require("../../validations/validate");

const { checkPermission } = require("../../middleware/permissions");

router.get("/", course.index);
router.post("/", bodyRule(), validate, course.create);
router.get("/:id/edit", paramRule(), validate, course.edit);
router.put("/:id", updateRule(), validate, course.update);
router.delete("/:id", paramRule(), validate, course.delete);
router.get("/:id", paramRule(), validate, course.show);

module.exports = router;
