const universityModel = require("../../schema/base_tables/universities");

const universities = require("../data/universities.json");

const fs = require("fs");
const path = require("path");

const importUniversities = async () => {
  try {
    await universityModel.deleteMany({});
    await universityModel.insertMany(universities);
    let result = await universityModel.find({});
    if (result) {
      let collections = result.map((el) => {
        let data = {};
        data[el.name.toString()] = el.id;
        return data;
      });
      let json = JSON.stringify(collections);
      let folder = path.join(__dirname, "..", "data");
      fs.writeFileSync(
        `${folder}/university.temp.json`,
        json,
        "utf-8",
        (err, data) => {
          if (err) console.log(err);
        }
      );
    }
    console.log("Universities imported successfully");
  } catch (error) {
    console.log(error);
  }
};

module.exports = importUniversities;
