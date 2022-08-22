const casteModel = require("../../schema/base_tables/castes");

const castes = require("../data/castes.json");

const fs = require("fs");
const path = require("path");

const importCastes = async () => {
  try {
    await casteModel.deleteMany({});
    await casteModel.insertMany(castes);
    let result = await casteModel.find({});
    if (result) {
      let collections = result.map((el) => {
        let data = {};
        data[el.name.toString()] = el.id;
        return data;
      });
      let json = JSON.stringify(collections);
      let folder = path.join(__dirname, "..", "data");
      fs.writeFileSync(
        `${folder}/caste.temp.json`,
        json,
        "utf-8",
        (err, data) => {
          if (err) console.log(err);
        }
      );
    }
    console.log("Castes imported successfully");
  } catch (error) {
    console.log(error);
  }
};

module.exports = importCastes;
