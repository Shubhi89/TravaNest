module.exports.isLoggedIn = (req, res, next) => {
    // Check if the user is authenticated
    if (!req.isAuthenticated()) {
        req.flash("error", "You must be logged in to perform this action");
        return res.redirect("/login");
    }
    next();
};