const loginHandler = async (e) => {
    e.preventDefault();
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();
    console.log(email);
    console.log(password);
    if (email && password) {
        const res = await fetch('/api/teacher/login', {
            method: "POST",
            body: JSON.stringify({email, password}),
            headers: {"Content-Type": "application/json"}
        });
        if (res.ok) {
            document.location.replace('/');
        } else {
            alert(res.statusText);
        }
    }
};

document.querySelector('#sign-in').addEventListener("click", loginHandler);