const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./../models/Users");
const { passwordEncrypt, passwordCompare } = require("../utils/encrypt");
const { userToken } = require("../utils/token.generator");
const { sendVerificationMail } = require("../utils/mailer");
const { signupValid } = require("../validation/validation");
const { uploadImageCloudinary } = require("../utils/cloudinary");
exports.userSignup = async (req, res) => {
  try {
    const validateUserData = signupValid(req.body);
    if (validateUserData.error) {
      return res
        .status(400)
        .json({ status: "Fail", message: validateUserData.error.message });
    }
    const { firstName, lastName, email, password } = req.body;
    const userPassword = await passwordEncrypt(password);
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
        error: "User with this email doesn't exist, please try another email",
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

// exports.uploadFile = async (req, res) => {
//   try {
//     const result = await upload.uploadImage(req);
//     res.status(200).json(result);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

exports.editProfile = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    const profile = await User.findOne({
      _id: req.user.id,
    });

    if (!req.file) {
      return res.status(500).json({ error: "No Image file found" });
    }

    let imageLink = await uploadImageCloudinary(req.file.buffer);

    // Update the profile properties
    if (firstName) {
      profile.firstName = firstName;
    }
    if (lastName) {
      profile.lastName = lastName;
    }
    if (email) {
      profile.email = email;
    }
    if (imageLink) {
      profile.profilePic = imageLink;
    }

    await profile.save();
    res.status(201).json({
      profile,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: "internal server error" });
  }
};
