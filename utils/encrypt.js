const bcrypt = require("bcrypt");

exports.passwordEncrypt = async (password) => {
  const salt = await bcrypt.genSalt(12);
  const hashedPawssord = await bcrypt.hash(password, salt);
  return hashedPawssord;
};

exports.passwordCompare = async (userPassword, inputPassword) => {
  const verifyPassowrd = await bcrypt.compare(inputPassword, userPassword);
  return verifyPassowrd;
};
