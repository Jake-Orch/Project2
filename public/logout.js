
const logoutHandler = async (e) => {
    console.log(e);
    e.preventDefault();
    const res = await fetch('/api/teacher/logout', {
        method: 'POST',
        headers: {"Content-Type": "application/json"}
    });
    if (res.ok) {
        document.location.replace('/login');
    }
    console.log(res);
};

document.querySelector('#logout').addEventListener('click', logoutHandler);