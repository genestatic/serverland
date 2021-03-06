const colors = require("colors");
const env = require("../config/env.config");

exports.initialize = async () => {
  // Configuring the database
  const dbConfig = require("../config/database.config.js");
  const mongoose = require("mongoose");

  mongoose.Promise = global.Promise;

  // Connecting to the database
  await mongoose
    .connect(await dbConfig(), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      retryWrites: true,
      w: "majority",
    })
    .then(async () => {
      await console.log("Successfully connected to the database".yellow.bold);
    })
    .catch(async (error) => {
      await console.log(
        "Could not connect to the database. Exiting now...",
        error
      );
      await process.exit(1);
    });
};
