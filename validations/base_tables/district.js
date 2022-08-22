const districtModel = require("../../schema/base_tables/districts");

const { body, param } = require("express-validator");

const { errorMessages } = require("../../lang/base_tables/district.json");

const stateMessages = require("../../lang/base_tables/state.json");

const bodyRule = () => {
  return [
    body("name", errorMessages.districtNameRequired).exists(),
    body("state", errorMessages.stateId).exists(),
    body("name", errorMessages.districtNameLength).isLength({
      min: 3,
      max: 60,
    }),
    body("state", stateMessages.errorMessages.stateIdLength).isLength({
      min: 24,
      max: 24,
    }),
    body("name").custom(async (name) => {
      try {
        const isNameTaken = await districtModel.findOne({ name });
        if (isNameTaken)
          return Promise.reject(errorMessages.districtAlreadyExists);
      } catch (error) {
        return Promise.reject(error);
      }
    }),
  ];
};

const paramRule = () => {
  return [
    param("id", errorMessages.districtIdRequired).exists(),
    param("id", errorMessages.districtIdLength).isLength({ min: 24, max: 24 }),
    param("id").custom(async (id) => {
      try {
        const state = await districtModel.findById(id);
        if (!state) return Promise.reject(errorMessages.districtNotExists);
      } catch (error) {
        return Promise.reject(error);
      }
    }),
  ];
};

const updateRule = () => [...paramRule(), ...bodyRule()];

module.exports = {
  bodyRule,
  paramRule,
  updateRule,
};
