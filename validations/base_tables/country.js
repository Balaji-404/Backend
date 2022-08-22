const countryModel = require("../../schema/base_tables/countries");

const { body, param } = require("express-validator");

const { errorMessages } = require("../../lang/base_tables/country.json");

const bodyRule = () => {
  return [
    body("name", errorMessages.countryNameRequired).exists(),
    body("name", errorMessages.countryNameLength).isLength({
      min: 4,
      max: 60,
    }),
    body("name").custom(async (name) => {
      try {
        const isNameTaken = await countryModel.findOne({ name });
        if (isNameTaken)
          return Promise.reject(errorMessages.countryAlreadyExists);
      } catch (error) {
        return Promise.reject(error);
      }
    }),
  ];
};

const paramRule = () => {
  return [
    param("id", errorMessages.countryIdRequired).exists(),
    param("id", errorMessages.countryIdLength).isLength({ min: 24, max: 24 }),
    param("id").custom(async (id) => {
      try {
        const country = await countryModel.findById(id);
        if (!country) return Promise.reject(errorMessages.countryNotExists);
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