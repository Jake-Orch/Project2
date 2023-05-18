const handleParentCreate = async (e) => {
    e.preventDefault();
    const name = document.querySelector("#parent_name").value.trim();
    const email = document.querySelector("#email").value.trim();
    if (name && email) {
      await fetch("/api/teacher/createparent", {
        method: "POST",
        body: JSON.stringify({ name, email }),
        headers: { "Content-Type": "application/json" },
      });
    }
  };
  
  const handleStudentCreate = async (e) => {
    e.preventDefault();
    const name = document.querySelector("#student_name").value.trim();
    const parent_id = document.querySelector("#parent_id").value;
    const group_id = document.querySelector("#group_id").value;
    if (name && parent_id && group_id) {
      await fetch("/api/teacher/createstudent", {
        method: "POST",
        body: JSON.stringify({ name, parent_id, group_id }),
        headers: { "Content-Type": "application/json" },
      });
    }
  };
  
  const handleParentEdit = async (e) => {
    e.preventDefault();
    const parent_id = document.querySelector("#editparent_id").value;
    const name = document.querySelector("#editparent_name").value.trim();
    const email = document.querySelector("#editparent_email").value.trim();
    await fetch("/api/teacher/editparent", {
      method: "PUT",
      body: JSON.stringify({ parent_id, name, email }),
      headers: { "Content-Type": "application/json" },
    });
  };
  
  const handleStudentEdit = async (e) => {
    e.preventDefault();
    const student_id = document.querySelector("#student_id_edit").value;
    const name = document.querySelector("#student_name_edit").value.trim();
    const group_id = document.querySelector("#student_groupid_edit").value;
    const club_id = document.querySelector("#add_club").value;
    const remove_club_id = document.querySelector("#remove_club").value;
    const parent_id = document.querySelector("#new_parent_id").value;
    const remove_parent_id = document.querySelector("#old_parent_id").value;
  
    const payload = {
      student_id,
      name,
      group_id,
      club_id,
      remove_club_id,
      parent_id,
      remove_parent_id,
    };
  
    await fetch("/api/teacher/editstudent", {
      method: "PUT",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    });
  };
  
  document
    .querySelector("#register_student")
    .addEventListener("submit", handleStudentCreate);
  document
    .querySelector("#register_parent")
    .addEventListener("submit", handleParentCreate);
  document
    .querySelector("#edit_parent")
    .addEventListener("submit", handleParentEdit);
  document
    .querySelector("#edit_student")
    .addEventListener("submit", handleStudentEdit);