const mongoose = require("mongoose");
const MongoURI =
  "mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";

const connectToMongo = () => {
  mongoose.connect(MongoURI, () => {
    console.log("Connected to Mongo Successfully..");
  });
};

module.exports = connectToMongo;
