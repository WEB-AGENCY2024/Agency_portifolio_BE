const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const Welcome = require("./routes/welcome");

const app = express();
dotenv.config({ path: "./config.env" });
//import the port
const port = process.env.PORT;
//todo :add the database here
const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB connection successful"));

//SWAGGER TO TEST OUR API
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api", Welcome);

app.listen(port, () => {
  console.log(`server is running on port ${port}....`);
});
