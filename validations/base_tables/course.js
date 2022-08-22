const courseModel = require("../../schema/base_tables/courses");

const { body, param } = require("express-validator");

const { errorMessages } = require("../../lang/base_tables/course.json");

const streamMessages = require("../../lang/base_tables/stream.json");

const bodyRule = () => {
  return [
    body("name", errorMessages.courseNameRequired).exists(),
    body("stream", errorMessages.streamId).exists(),
    body("name", errorMessages.courseNameLength).isLength({
      min: 3,
      max: 60,
    }),
    body("stream", streamMessages.errorMessages.streamIdLength).isLength({
      min: 24,
      max: 24,
    }),
    body("name").custom(async (name) => {
      try {
        const isNameTaken = await courseModel.findOne({ name });
        if (isNameTaken)
          return Promise.reject(errorMessages.courseAlreadyExists);
      } catch (error) {
        return Promise.reject(error);
      }
    }),
  ];
};

const paramRule = () => {
  return [
    param("id", errorMessages.courseIdRequired).exists(),
    param("id", errorMessages.courseIdLength).isLength({ min: 24, max: 24 }),
    param("id").custom(async (id) => {
      try {
        const course = await courseModel.findById(id);
        if (!course) return Promise.reject(errorMessages.courseNotExists);
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
