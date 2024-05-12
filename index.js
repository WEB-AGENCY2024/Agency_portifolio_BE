const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const userRoutes = require("./routes/welcome");
const session = require("express-session");
const passport = require("./config/passport.config");
const cors = require("cors");

const { config } = require("dotenv");
const dbConnection = require("./config/dbconfig");
config({ path: "./config.env" });

const app = express();

//import the port
app.use(cors());
const port = process.env.PORT;

app.use(
  session({
    secret: process.env.SESSION,
    resave: false,
    saveUninitialized: false,
  })
);

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);
console.log(DB);
//SWAGGER TO TEST OUR API

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/users", userRoutes);
app.use(passport.initialize());
app.use(passport.session);
app.use(express.json());

app.listen(port, () => {
  console.log(`server is running on port ${port}....`);
  dbConnection(DB);
});
