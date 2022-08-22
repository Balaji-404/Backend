const country = require("../../controllers/base_tables/country");

const router = require("express").Router();

const {
  bodyRule,
  paramRule,
  updateRule,
} = require("../../validations/base_tables/country");

const validate = require("../../validations/validate");

const { checkPermission } = require("../../middleware/permissions");

router.get("/", country.index);
router.post(
  "/",
  checkPermission("create-country"),
  bodyRule(),
  validate,
  country.create
);
router.get(
  "/:id/edit",
  checkPermission("edit-country"),
  paramRule(),
  validate,
  country.edit
);
router.put(
  "/:id",
  checkPermission("update-country"),
  updateRule(),
  validate,
  country.update
);
router.delete(
  "/:id",
  checkPermission("delete-country"),
  paramRule(),
  validate,
  country.delete
);
router.get(
  "/:id",
  checkPermission("show-country"),
  paramRule(),
  validate,
  country.show
);

module.exports = router;
