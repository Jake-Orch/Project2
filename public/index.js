const loginHandler = async (e) => {
    e.preventDefault();
    const name = document.querySelector("#username").value.trim();
    const password = document.querySelector("#password").value.trim();

    if (name && password) {
        const res = await fetch("/login", {
            method: "POST",
            body: JSON.stringify({ name, password }),
            headers: { "Content-Type": "application/json" }
        });
        if (res.ok) {
            document.location.replace("/");
        } else {
            alert(res.statusText);
        }
    }
}


document.querySelector("login-button").addEventListener("submit", loginHandler);
document.querySelector("change-email").addEventListener("click", changeEmail);
document.querySelector("change-password").addEventListener("click", changePassword);
