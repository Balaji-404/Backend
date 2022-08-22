const courseModel = require("../../schema/base_tables/courses");

const courses = require("../data/courses.json");

const fs = require("fs");
const path = require("path");

const importCourses = async () => {
  try {
    const folder = path.join(__dirname, "..", "data");
    const streamsPath = `${folder}/stream.temp.json`;
    const coursesPath = `${folder}/course.temp.json`;
    const fileContent = fs.readFileSync(streamsPath, "utf8");
    const streams = JSON.parse(fileContent);
    await courseModel.deleteMany({});
    let coursesData = [];
    for (let i = 0; i < courses.length; i++) {
      let course = courses[i];
      let c = Object.keys(course)[0];
      let id = streams.filter((el) => c === Object.keys(el)[0])[0];
      let data = course[c].map((el) => ({ stream: id[c], ...el }));
      coursesData.push(...data);
    }
    const result = await courseModel.insertMany(coursesData);
    if (result) {
      let collections = result.map((el) => {
        let data = {};
        data[el.name.toString()] = el.id;
        return data;
      });
      let json = JSON.stringify(collections);
      fs.writeFileSync(coursesPath, json, "utf-8", (err, data) => {
        if (err) console.log(err);
      });
      console.log("Courses imported successfully");
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = importCourses;
