const passport = require("./../config/google.config");
const { userToken } = require("./../utils/token.generator");

exports.initiateGoogleLogin = (req, res, next) => {
  passport.authenticate("google", { scope: ["profile", "email"] })(
    req,
    res,
    next
  );
};

exports.handleCallback = async (req, res) => {
  passport.authenticate("google", async (err, user) => {
    if (err) {
      return res.status(500).json({ error: "Failed to Authenicate google" });
    }
    if (!user) {
      return res.status(500).json({ error: "User not found" });
    }
    try {
      const token = await userToken(user.id, user.email);
      res.status(200).json({
        status: "Successful",
        token: token,
      });
    } catch (error) {
      res.status(500).json({ error: "Token generation fail" });
    }
  })(req, res);
};
