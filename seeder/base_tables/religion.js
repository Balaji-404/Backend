const religionModel = require("../../schema/base_tables/religions");

const religions = require("../data/religions.json");

const fs = require("fs");
const path = require("path");

const importReligions = async () => {
  try {
    await religionModel.deleteMany({});
    await religionModel.insertMany(religions);
    let result = await religionModel.find({});
    if (result) {
      let collections = result.map((el) => {
        let data = {};
        data[el.name.toString()] = el.id;
        return data;
      });
      let json = JSON.stringify(collections);
      let folder = path.join(__dirname, "..", "data");
      fs.writeFileSync(
        `${folder}/religion.temp.json`,
        json,
        "utf-8",
        (err, data) => {
          if (err) console.log(err);
        }
      );
    }
    console.log("Religions imported successfully");
  } catch (error) {
    console.log(error);
  }
};

module.exports = importReligions;
