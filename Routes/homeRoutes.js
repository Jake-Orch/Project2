const router = require("express").Router();
const { Parent, Teacher, Club, Group, Student } = require("../models");
const withAuth = require("../utils/withAuth");

router.get("/", withAuth, async (req, res) => {
  try {
    const teacherData = await Teacher.findByPk(req.session.userId, {
      include: [
        {
          model: Group,
          include: [
            {
              model: Student,
              include: [
                {
                  model: Parent,
                },
              ],
            },
          ],
        },
        {
          model: Club,
        },
      ],
    });
    const teacherInfo = teacherData.get({ plain: true });
    const groups = await Group.findAll();
    const parents = await Parent.findAll();
    const students = await Student.findAll();
    const clubs = await Club.findAll();

    const groupData = groups.map((group) => group.get({ plain: true }));
    const parentData = parents.map((parent) => parent.get({ plain: true }));
    const studentData = students.map((student) => student.get({ plain: true }));
    const clubData = clubs.map((club) => club.get({ plain: true }));

    res.render("student-parent", {
      loggedIn: req.session.loggedIn,
      teacherInfo,
      groupData,
      parentData,
      studentData,
      clubData,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("signup-selection");
});

module.exports = router;