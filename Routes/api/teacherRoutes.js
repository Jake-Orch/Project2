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
  const { name, email, parent_id, remove_parent } = req.body;
  try {
    if (name !== null) {
      try {
        await Parent.update(
          { name: name },
          {
            where: {
              id: parent_id,
            },
          }
        );
      } catch (err) {
        console.log(err);
      }
    }
    if (email !== null) {
      try {
        try {
          await Parent.update(
            { email: email },
            {
              where: {
                id: parent_id,
              },
            }
          );
        } catch (err) {
          console.log(err)
        }
      } catch (err) {
        console.log(err);
      }
    }
    if (remove_parent == "yes") {
      try {
        await Parent.destroy(
          {
            where: {
              id: parent_id
            },
          }
        );
      } catch (err) {
        console.log(err);
      }
    };
    res.redirect("back");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/editstudent", async (req, res) => {
  const { student_id, name, group_id, parent_id, remove_student } = req.body;
  try {
    if (name !== null) {
      try {
        await Student.update(
          { name: name },
          {
            where: {
              id: student_id
            },
          }
        );
      } catch (err) {
        console.log(err);
      }
    };
    if (group_id !== null) {
      try {
        await Student.update(
          { group_id: group_id },
          {
            where: {
              id: student_id
            },
          }
        );
      } catch (err) {
        console.log(err);
      }
    };
    // if (club_id !== null) {
    //   try {
    //     await Student.update(
    //       { club_id: club_id },
    //       {
    //         where: {
    //           id: student_id
    //         },
    //       }
    //     );
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
    if (parent_id !== null) {
      try {
        await Student.update(
          { parent_id: parent_id },
          {
            where: {
              id: student_id
            },
          }
        );
      } catch (err) {
        console.log(err);
      }
    };
    // if (remove_club == "yes") {
    //   try {
    //     await Student.update(
    //       { club_id: null },
    //       {
    //         where: {
    //           id: student_id
    //         },
    //       }
    //     );
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
    if (remove_student == "yes") {
      try {
        await Student.destroy(
          {
            where: {
              id: student_id
            },
          }
        );
      } catch (err) {
        console.log(err);
      }
    };
    res.redirect("back");
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;