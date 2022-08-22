const stateModel = require("../../schema/base_tables/states");

const { body, param } = require("express-validator");

const { errorMessages } = require("../../lang/base_tables/state.json");

const countryMessages = require("../../lang/base_tables/country.json");

const bodyRule = () => {
  return [
    body("name", errorMessages.stateNameRequired).exists(),
    body("country", errorMessages.countryId).exists(),
    body("name", errorMessages.stateNameLength).isLength({
      min: 3,
      max: 60,
    }),
    body("country", countryMessages.errorMessages.countryIdLength).isLength({
      min: 24,
      max: 24,
    }),
    body("name").custom(async (name) => {
      try {
        const isNameTaken = await stateModel.findOne({ name });
        if (isNameTaken)
          return Promise.reject(errorMessages.stateAlreadyExists);
      } catch (error) {
        return Promise.reject(error);
      }
    }),
  ];
};

const paramRule = () => {
  return [
    param("id", errorMessages.stateIdRequired).exists(),
    param("id", errorMessages.stateIdLength).isLength({ min: 24, max: 24 }),
    param("id").custom(async (id) => {
      try {
        const state = await stateModel.findById(id);
        if (!state) return Promise.reject(errorMessages.stateNotExists);
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
