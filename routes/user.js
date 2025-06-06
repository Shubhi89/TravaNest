const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js");


router.route("/signup")
  .get(userController.renderSignUp)
  .post(
    wrapAsync(userController.signUpUser)
);

router.route("/login")
  .get(userController.renderLogin)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
  wrapAsync(userController.loginUser)
);

router.get("/logout", userController.logoutUser);

module.exports = router;
