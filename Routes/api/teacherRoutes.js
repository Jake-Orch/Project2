const router = require('express').Router();
const { Teacher } = require('../../models');

router.post('/login', async (req, res) => {
    console.log(req.body);
    try {
        const teacherData = await Teacher.findOne({
            where: {email: req.body.email}
        });
        if (!teacherData) {
            res.status(400).json({message:"User not found, please tyr again."});
            return
        };
        const validPassword = await teacherData.checkPassword(req.body.password)
        if (!validPassword) {
            res.status(400).json({message:"Incorrect password, please try again"});
            return
        };
        req.session.save(() => {
            req.session.userId = teacherData.id,
            req.session.loggedIn = true,
            res.json({teacher:teacherData, message:"Login Successful"});
        });
    } catch (err) {
        res.status(400).json(err);
    };
});

router.post('/', async (req, res) => {
    try {
        const teacherData = await Teacher.create(req.body);
        req.session.save(() => {
            req.session.userId = teacherData.id,
            req.session.loggedIn = true,
            res.json(teacherData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/logout', (req, res) => {
    console.log(req.session);
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        })
    } else {
        res.status(404).end();
    }
});

router.post('/createparent', (req, res) => {
    console.log(req.body);
    res.send('Recieved');
});

router.post('/createstudent', (req, res) => {
    console.log(req.body);
    res.send('Recieved');
});

router.put('/editparent', (req, res) => {
    console.log(req.body);
    res.send('Recieved');
});

router.put('/editstudent', (req, res) => {
    console.log(req.body);
    res.send('Recieved');
});


module.exports = router;