const router = require("express").Router();
const { Teacher, Student, Parent } = require("../../models");

router.post("/login", async (req, res) => {
  console.log(req.body);
  try {
    const teacherData = await Teacher.findOne({
      where: { email: req.body.email },
    });
    if (!teacherData) {
      res.status(400).json({ message: "User not found, please tyr again." });
      return;
    }
    const validPassword = await teacherData.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password, please try again" });
      return;
    }
    req.session.save(() => {
      (req.session.userId = teacherData.id),
        (req.session.loggedIn = true),
        res.json({ teacher: teacherData, message: "Login Successful" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const teacherData = await Teacher.create(req.body);
    req.session.save(() => {
      (req.session.userId = teacherData.id),
        (req.session.loggedIn = true),
        res.json(teacherData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/logout", (req, res) => {
  console.log(req.session);
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.post("/createparent", async (req, res) => {
  console.log(req.body)
  try {
    await Parent.create(req.body);
    res.redirect("back");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/createstudent", async (req, res) => {
  try {
    await Student.create(req.body);
    res.redirect("back");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/editparent", async (req, res) => {
  const { name, email, parent_id } = req.body;
  try {
    await Parent.update(
      { name: name, email: email },
      {
        where: {
          id: parent_id,
        },
      }
    );
    res.redirect("back");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/editstudent", async (req, res) => {
  const { student_id, remove_club_id, remove_parent_id } = req.body;

  if (remove_club_id !== " ") {
    await Student.update(
      { club_id: null },
      { where: { club_id: remove_club_id, id: student_id } }
    );
  }
  if (remove_parent_id !== " ") {
    await Student.update(
      { parent_id: null },
      { where: { parent_id: remove_parent_id, id: student_id } }
    );
  }
  const updatedReqBody = Object.keys(req.body).reduce((acc, key) => {
    if (req.body[key] !== " ") {
      acc[key] = req.body[key];
    }
    return acc;
  }, {});
  delete updatedReqBody.student_id;
  delete updatedReqBody.remove_club_id;
  delete updatedReqBody.remove_parent_id;
  try {
    await Student.update(updatedReqBody, {
      where: {
        id: student_id,
      },
    });
    res.redirect("back");
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;