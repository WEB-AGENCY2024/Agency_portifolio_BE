const express = require("express");
const userSignup = require("../controllers/user.controller");
const authenticate = require("../middlewares/user.auth");
const googleInitialization = require("./../controllers/google.controller");
const userRoutes = express.Router();

userRoutes.get("/google", googleInitialization.initiateGoogleLogin);
userRoutes.get("/google/callback", googleInitialization.handleCallback);

// User signup route
userRoutes.get("/welcome", (req, res) => {
  res.json({ welcome: "Welcome to our website" });
});
userRoutes.post("/signup", userSignup.userSignup);
userRoutes.post("/login", userSignup.userLogin);
userRoutes.get("/profile", authenticate, userSignup.profile);
module.exports = userRoutes;
