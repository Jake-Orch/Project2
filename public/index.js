const handleGroupCreate = async (e) => {
  e.preventDefault();
  const name = document.querySelector("#create_group_name").value.trim();
  if (name) {
    await fetch("/api/teacher/creategroup", {
      method: "POST",
      body: JSON.stringify({name}),
      headers: { "Content-Type": "application/json" },
    });
  }
};

const handleClubCreate = async (e) => {
  e.preventDefault();
  const name = document.querySelector("#create_club_name").value.trim();
  const day_of_club = document.querySelector('#club_day').value;
  console.log(name);
  console.log(day_of_club)
  if (name && day_of_club) {
    await fetch("/api/teacher/createclub", {
      method: "POST",
      body: JSON.stringify({name, day_of_club}),
      headers: { "Content-Type": "application/json" },
    });
  }
};

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

const handleGroupEdit = async (e) => {
  e.preventDefault();
  const group_id = document.querySelector("#edit_group_id").value;
  const name = document.querySelector("#new_group_name").value.trim();
  const delete_group = document.querySelector("#delete_group").value;
  await fetch("/api/teacher/editgroup", {
    method: "PUT",
    body: JSON.stringify({ group_id, delete_group, name }),
    headers: { "Content-Type": "application/json" },
  });
};

const handleClubEdit = async (e) => {
  e.preventDefault();
  const club_id = document.querySelector("#edit_club_id").value;
  const name = document.querySelector("#new_club_name").value.trim();
  const day_of_club = document.querySelector("#edit_club_day").value;
  const delete_club = document.querySelector("#delete_club").value;
  await fetch("/api/teacher/editclub", {
    method: "PUT",
    body: JSON.stringify({ club_id, delete_club, name, day_of_club }),
    headers: { "Content-Type": "application/json" },
  });
};

const handleParentEdit = async (e) => {
  e.preventDefault();
  const parent_id = document.querySelector("#editparent_id").value;
  const name = document.querySelector("#editparent_name").value.trim();
  const email = document.querySelector("#editparent_email").value.trim();
  const remove_parent = document.querySelector("#remove_parent").value;
  await fetch("/api/teacher/editparent", {
    method: "PUT",
    body: JSON.stringify({ parent_id, name, email, remove_parent }),
    headers: { "Content-Type": "application/json" },
  });
};

const handleStudentEdit = async (e) => {
  e.preventDefault();
  const student_id = document.querySelector("#student_id_edit").value;
  const name = document.querySelector("#student_name_edit").value.trim();
  const group_id = document.querySelector("#student_groupid_edit").value;
  const club_id = document.querySelector("#add_club").value;
  const parent_id = document.querySelector("#new_parent_id").value;
  const remove_club = document.querySelector("#remove_club").value;
  const remove_student = document.querySelector("#remove_student").value;
  await fetch("/api/teacher/editstudent", {
    method: "PUT",
    body: JSON.stringify({ student_id, name, group_id, club_id, parent_id, remove_club, remove_student }),
    headers: { "Content-Type": "application/json" },
  });
};



document
  .querySelector("#create_group")
  .addEventListener("submit", handleGroupCreate);
document
  .querySelector("#create_club")
  .addEventListener("submit", handleClubCreate);
document
  .querySelector("#register_student")
  .addEventListener("submit", handleStudentCreate);
document
  .querySelector("#register_parent")
  .addEventListener("submit", handleParentCreate);
document
  .querySelector("#edit_group")
  .addEventListener("submit", handleGroupEdit);
document
  .querySelector("#edit_club")
  .addEventListener("submit", handleClubEdit);
document
  .querySelector("#edit_parent")
  .addEventListener("submit", handleParentEdit);
document
  .querySelector("#edit_student")
  .addEventListener("submit", handleStudentEdit);