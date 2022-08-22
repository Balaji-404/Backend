const districtModel = require("../../schema/base_tables/districts");

const districts = require("../data/districts.json");

const fs = require("fs");
const path = require("path");

const importDistricts = async () => {
  try {
    const folder = path.join(__dirname, "..", "data");
    const statesPath = `${folder}/state.temp.json`;
    const districtsPath = `${folder}/district.temp.json`;
    const fileContent = fs.readFileSync(statesPath, "utf8");
    const states = JSON.parse(fileContent);
    await districtModel.deleteMany({});
    let districtsData = [];
    for (let i = 0; i < districts.length; i++) {
      let district = districts[i];
      let s = Object.keys(district)[0];
      let id = states.filter((el) => s === Object.keys(el)[0])[0];
      let data = district[s].map((el) => ({ state: id[s], ...el }));
      districtsData.push(...data);
    }
    const result = await districtModel.insertMany(districtsData);
    if (result) {
      let collections = result.map((el) => {
        let data = {};
        data[el.name.toString()] = el.id;
        return data;
      });
      let json = JSON.stringify(collections);
      fs.writeFileSync(districtsPath, json, "utf-8", (err, data) => {
        if (err) console.log(err);
      });
      console.log("Districts imported successfully");
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = importDistricts;
