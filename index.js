const express = require("express");
const dotenv = require("dotenv");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const Welcome = require("./routes/welcome");

const app = express();
dotenv.config();
//import the port
const port = process.env.PORT;
//todo :add the database here

//SWAGGER TO TEST OUR API
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api", Welcome);

app.listen(port, () => {
  console.log(`server is running on port ${port}....`);
});
