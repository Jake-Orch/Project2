const withAuth = (req, res, next) => {
    if (!req.session.logged_id) {
        res.redirect("/login");
    }
    next();
};

module.exports = withAuth;