const familyincomegroupModel = require("../../schema/base_tables/familyincomegroups");

const { body, param } = require("express-validator");

const { errorMessages } = require("../../lang/base_tables/familyincomegroup.json");

const bodyRule = () => {
  return [
    body("name", errorMessages.familyIncomeGroupNameRequired).exists(),
    body("name", errorMessages.familyIncomeGroupNameLength).isLength({
      min: 4,
      max: 60,
    }),
    body("name").custom(async (name) => {
      try {
        const isNameTaken = await familyincomegroupModel.findOne({ name });
        if (isNameTaken)
          return Promise.reject(errorMessages.familyIncomeGroupAlreadyExists);
      } catch (error) {
        return Promise.reject(error);
      }
    }),
  ];
};

const paramRule = () => {
  return [
    param("id", errorMessages.familyIncomeGroupIdRequired).exists(),
    param("id", errorMessages.familyIncomeGroupIdLength).isLength({ min: 24, max: 24 }),
    param("id").custom(async (id) => {
      try {
        const familyincomegroup = await familyincomegroupModel.findById(id);
        if (!familyincomegroup) return Promise.reject(errorMessages.familyIncomeGroupNotExists);
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