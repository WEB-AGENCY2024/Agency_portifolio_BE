const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./../models/Users");
const { passwordEncrypt, passwordCompare } = require("../utils/encrypt");
const { userToken } = require("../utils/token.generator");
const { sendVerificationMail } = require("../utils/mailer");
exports.userSignup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const userPassword = await passwordEncrypt(password);
    console.log(req.body);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: userPassword,
    });

    await newUser.save();
    res.status(201).json({
      newUser,
    });

    // // Create verification link
    // const link = `api/users/${token}/verify-email`;

    // // Send verification email
    // sendVerificationMail(email, link, firstName);
  } catch (err) {
    res
      .status(500)
      .json({ message: "internal server error", err: err.message });
  }
};

exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await User.findOne({
      email: email,
    });
    if (!findUser) {
      return res.status(400).json({
        message: "Fail",
        error: "User with this email is not exist, please try another email",
      });
    }
    const passwordCheck = await passwordCompare(findUser.password, password);
    if (!passwordCheck) {
      return res.status(400).json({
        message: "Fail",
        error: "Password incorrect",
      });
    }

    //Generate a JWT token
    const token = await userToken(findUser._id, findUser.email);

    res.status(200).json({ message: "Login Successfully", token });
  } catch (err) {
    res.status(500).json({ err: "internal server error" });
  }
};

exports.profile = (req, res) => {
  try {
    res.status(200).json({ message: "User profile", user: req.user });
  } catch (err) {}
};
