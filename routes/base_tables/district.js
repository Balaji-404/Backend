const district = require("../../controllers/base_tables/district");

const router = require("express").Router();

const {
  bodyRule,
  paramRule,
  updateRule,
} = require("../../validations/base_tables/district");

const validate = require("../../validations/validate");

const { checkPermission } = require("../../middleware/permissions");

router.get("/", district.index);
router.post(
  "/",
  checkPermission("create-district"),
  bodyRule(),
  validate,
  district.create
);
router.get(
  "/:id/edit",
  checkPermission("edit-district"),
  paramRule(),
  validate,
  district.edit
);
router.put(
  "/:id",
  checkPermission("update-district"),
  updateRule(),
  validate,
  district.update
);
router.delete(
  "/:id",
  checkPermission("delete-district"),
  paramRule(),
  validate,
  district.delete
);
router.get(
  "/:id",
  checkPermission("show-district"),
  paramRule(),
  validate,
  district.show
);

module.exports = router;
