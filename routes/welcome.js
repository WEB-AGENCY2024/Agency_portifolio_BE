const express = require("express");
const userSignup = require("../controllers/user.controller");
const authenticate = require("../middlewares/user.auth");

const userRoutes = express.Router();

// User signup route
userRoutes.post("/signup", userSignup.userSignup);
userRoutes.post("/login", userSignup.userLogin);
userRoutes.get("/profile", authenticate, userSignup.profile);
module.exports = userRoutes;
