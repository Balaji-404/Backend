const state = require("../../controllers/base_tables/state");

const router = require("express").Router();

const {
  bodyRule,
  paramRule,
  updateRule,
} = require("../../validations/base_tables/state");

const validate = require("../../validations/validate");

const { checkPermission } = require("../../middleware/permissions");

router.get("/", state.index);
router.post(
  "/",
  checkPermission("create-state"),
  bodyRule(),
  validate,
  state.create
);
router.get(
  "/:id/edit",
  checkPermission("edit-state"),
  paramRule(),
  validate,
  state.edit
);
router.put(
  "/:id",
  checkPermission("update-state"),
  updateRule(),
  validate,
  state.update
);
router.delete(
  "/:id",
  checkPermission("delete-state"),
  paramRule(),
  validate,
  state.delete
);
router.get(
  "/:id",
  checkPermission("show-state"),
  paramRule(),
  validate,
  state.show
);

module.exports = router;
