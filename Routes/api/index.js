const router = require('express').Router();
const teacherRoutes = require('./teacherRoutes');

router.use('/teacher', teacherRoutes);

module.exports = router;