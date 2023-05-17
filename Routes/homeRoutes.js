const router = require('express').Router();
const withAuth = require('../utils/withAuth');

router.get('/', withAuth, async (req, res) => {
    try {
        res.render('student-parent', {loggedIn: req.session.loggedIn});
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return
    }
    res.render('signup-selection');
});

module.exports = router;