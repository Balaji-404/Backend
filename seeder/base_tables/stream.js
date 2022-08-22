const streamModel = require("../../schema/base_tables/streams");

const streams = require("../data/streams.json");

const fs = require("fs");
const path = require("path");

const importStreams = async () => {
  try {
    await streamModel.deleteMany({});
    await streamModel.insertMany(streams);
    let result = await streamModel.find({});
    if (result) {
      let collections = result.map((el) => {
        let data = {};
        data[el.name.toString()] = el.id;
        return data;
      });
      let json = JSON.stringify(collections);
      let folder = path.join(__dirname, "..", "data");
      fs.writeFileSync(
        `${folder}/stream.temp.json`,
        json,
        "utf-8",
        (err, data) => {
          if (err) console.log(err);
        }
      );
    }
    console.log("Streams imported successfully");
  } catch (error) {
    console.log(error);
  }
};

module.exports = importStreams;
