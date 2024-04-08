const express = require("express");
const Welcome = express.Router();

Welcome.get("/welcome", (req, res) => {
  res
    .status(200)
    .json({ message: "welcome to our web API of portifolio Agency" });
});

module.exports = Welcome;
