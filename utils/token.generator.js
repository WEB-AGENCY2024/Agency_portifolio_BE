const jwt = require("jsonwebtoken");
const { config } = require("dotenv");
config({ path: "./config.env" });

exports.userToken = async (userId, userEmail) => {
  const payload = {
    id: userId,
    email: userEmail,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  return token;
};
