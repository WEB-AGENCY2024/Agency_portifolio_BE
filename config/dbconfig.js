const mongoose = require("mongoose");
const dbConnection = (DB) => {
  try {
    mongoose.connect(DB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("DB connection successful");
  } catch (err) {
    console.log(err);
    return;
  }
};

module.exports = dbConnection;
