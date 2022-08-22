const skillcategoryModel = require("../../schema/base_tables/skillcategories");

const { body, param } = require("express-validator");

const { errorMessages } = require("../../lang/base_tables/skillcategory.json");

const bodyRule = () => {
  return [
    body("name", errorMessages.skillCategoryNameRequired).exists(),
    body("name", errorMessages.skillCategoryNameLength).isLength({
      min: 4,
      max: 60,
    }),
    body("name").custom(async (name) => {
      try {
        const isNameTaken = await skillcategoryModel.findOne({ name });
        if (isNameTaken)
          return Promise.reject(errorMessages.skillCategoryAlreadyExists);
      } catch (error) {
        return Promise.reject(error);
      }
    }),
  ];
};

const paramRule = () => {
  return [
    param("id", errorMessages.skillCategoryIdRequired).exists(),
    param("id", errorMessages.skillCategoryIdLength).isLength({ min: 24, max: 24 }),
    param("id").custom(async (id) => {
      try {
        const skillcategory = await skillcategoryModel.findById(id);
        if (!skillcategory) return Promise.reject(errorMessages.skillCategoryNotExists);
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