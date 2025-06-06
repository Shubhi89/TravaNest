const User = require("../models/user.js");

module.exports.renderSignUp = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.signUpUser = async (req, res, next) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new User({ username, email });
      const registeredUser = await User.register(newUser, password);
      req.login(registeredUser, (error) => {
        if (error) {
          return next(error);
        }
        req.flash("success", "Welcome to Travanest!");
        res.redirect("/listings");
      });
    } catch (error) {
      req.flash("error", error.message);
      res.redirect("/signup");
    }
};

module.exports.renderLogin = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.loginUser = async (req, res) => {
    req.flash("success", "Welcome back to TravaNest!");
    res.redirect(res.locals.redirectUrl || "/listings");
};

module.exports.logoutUser = (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return next(error);
    }
    req.flash("success", "Logged out successfully!");
    res.redirect("/listings");
  });
};
