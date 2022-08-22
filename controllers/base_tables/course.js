const courseModel = require("../../schema/base_tables/courses");
const returnMessage = require("../message");
const { successMessages } = require("../../lang/base_tables/course.json");

module.exports = {
  index: async (req, res) => {
    try {
      const courses = await courseModel.find({})
      returnMessage.successMessage(res, successMessages.getAllCourses, courses);
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  create: async (req, res) => {
    try {
      const course = await courseModel.create({ ...req.body });
      returnMessage.successMessage(
        res,
        successMessages.addCourse,
        course.populate("stream", "name")
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  edit: async (req, res) => {
    try {
      const course = await courseModel
        .findOne({ _id: req.params["id"] })
        .populate("stream", "name");
      returnMessage.successMessage(res, successMessages.showCourse, course);
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  update: async (req, res) => {
    try {
      const course = await courseModel.findByIdAndUpdate(
        req.params["id"],
        {
          ...req.body,
        },
        { new: true }
      );
      returnMessage.successMessage(
        res,
        successMessages.updateCourse,
        course.populate("stream", "country")
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  delete: async (req, res) => {
    try {
      await courseModel.remove({ _id: req.params["id"] });
      returnMessage.successMessage(res, successMessages.deleteCourse);
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  show: async (req, res) => {
    try {
      const course = await courseModel
        .findOne({ _id: req.params["id"] })
        .populate("stream", "name");
      returnMessage.successMessage(res, successMessages.showCourse, course);
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
};
