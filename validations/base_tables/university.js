const universityModel = require("../../schema/base_tables/universities");

const { body, param } = require("express-validator");

const { errorMessages } = require("../../lang/base_tables/university.json");

const bodyRule = () => {
  return [
    body("name", errorMessages.universityNameRequired).exists(),
    body("name", errorMessages.universityNameLength).isLength({
      min: 4,
      max: 60,
    }),
    body("name").custom(async (name) => {
      try {
        const isNameTaken = await universityModel.findOne({ name });
        if (isNameTaken)
          return Promise.reject(errorMessages.universityAlreadyExists);
      } catch (error) {
        return Promise.reject(error);
      }
    }),
  ];
};

const paramRule = () => {
  return [
    param("id", errorMessages.universityIdRequired).exists(),
    param("id", errorMessages.universityIdLength).isLength({ min: 24, max: 24 }),
    param("id").custom(async (id) => {
      try {
        const university = await universityModel.findById(id);
        if (!university) return Promise.reject(errorMessages.universityNotExists);
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