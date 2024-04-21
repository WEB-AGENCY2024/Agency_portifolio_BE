const passport = require("../config/passport.config");

const authenticate = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (error, user) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    if (!user) {
      return res
        .status(401)
        .json({ error: "Unauthorized User. Please login to continue" });
    }

    req.user = user;
    return next();
  })(req, res, next);
};

module.exports = authenticate;
