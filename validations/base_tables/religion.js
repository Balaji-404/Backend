const religionModel = require("../../schema/base_tables/religions");

const { body, param } = require("express-validator");

const { errorMessages } = require("../../lang/base_tables/religion.json");

const bodyRule = () => {
  return [
    body("name", errorMessages.religionNameRequired).exists(),
    body("name", errorMessages.religionNameLength).isLength({
      min: 4,
      max: 60,
    }),
    body("name").custom(async (name) => {
      try {
        const isNameTaken = await religionModel.findOne({ name });
        if (isNameTaken)
          return Promise.reject(errorMessages.religionAlreadyExists);
      } catch (error) {
        return Promise.reject(error);
      }
    }),
  ];
};

const paramRule = () => {
  return [
    param("id", errorMessages.religionIdRequired).exists(),
    param("id", errorMessages.religionIdLength).isLength({ min: 24, max: 24 }),
    param("id").custom(async (id) => {
      try {
        const religion = await religionModel.findById(id);
        if (!religion) return Promise.reject(errorMessages.religionNotExists);
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