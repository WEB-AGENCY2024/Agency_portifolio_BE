const joi = require("joi");

exports.signupValid = (signup) => {
  const newUser = joi.object({
    firstName: joi.string().min(4).max(20).required(),
    lastName: joi.string().min(4).max(20).required(),
    email: joi.string().email().required(),
    password: joi
      .string()
      .pattern(/^(?=.[a-zA-Z])(?=.\d)[a-zA-Z\d]{8,}$/)
      .required(),
  });
  return newUser.validate(signup);
};
