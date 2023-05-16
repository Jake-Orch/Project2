const withAuth = (req, res, next) => {
    if (!req.session.loggedIn) {
        return res.redirect("/login");
    }
    next();
};

module.exports = withAuth;