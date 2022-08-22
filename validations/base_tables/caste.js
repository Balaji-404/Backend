const casteModel = require("../../schema/base_tables/castes");

const { body, param } = require("express-validator");

const { errorMessages } = require("../../lang/base_tables/caste.json");

const bodyRule = () => {
  return [
    body("name", errorMessages.casteNameRequired).exists(),
    body("name", errorMessages.casteNameLength).isLength({
      min: 4,
      max: 60,
    }),
    body("name").custom(async (name) => {
      try {
        const isNameTaken = await casteModel.findOne({ name });
        if (isNameTaken)
          return Promise.reject(errorMessages.casteAlreadyExists);
      } catch (error) {
        return Promise.reject(error);
      }
    }),
  ];
};

const paramRule = () => {
  return [
    param("id", errorMessages.casteIdRequired).exists(),
    param("id", errorMessages.casteIdLength).isLength({ min: 24, max: 24 }),
    param("id").custom(async (id) => {
      try {
        const caste = await casteModel.findById(id);
        if (!caste) return Promise.reject(errorMessages.casteNotExists);
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
