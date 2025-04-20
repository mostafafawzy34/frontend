const users = [];

function showSignUp() {
    document.getElementById("loginForm").classList.add("d-none");
    document.getElementById("signUpForm").classList.remove("d-none");
    clearMessages();
}

function showLogin() {
    document.getElementById("signUpForm").classList.add("d-none");
    document.getElementById("loginForm").classList.remove("d-none");
    clearMessages();
}

function clearMessages() {
    document.getElementById("loginErrorMessage").textContent = "";
    document.getElementById("loginErrorMessage").classList.add("d-none");
    document.getElementById("signUpErrorMessage").textContent = "";
    document.getElementById("signUpErrorMessage").classList.add("d-none");
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    return passwordRegex.test(password);
}

function login() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    const errorMessage = document.getElementById("loginErrorMessage");

    const user = users.find((u) => u.email === email && u.password === password);

    if (!user) {
        errorMessage.textContent = "Incorrect email or password.";
        errorMessage.classList.remove("d-none");
    } else {
        clearMessages();
        showWelcomeScreen(user.name);
    }
}

function showWelcomeScreen(name) {
    document.getElementById("authContainer").classList.add("d-none");
    document.getElementById("welcomeScreen").classList.remove("d-none");
    document.getElementById("logoutBtn").classList.remove("d-none");
    document.getElementById("welcomeMessage").textContent = `Welcome ${name}`;
}

function logout() {
    document.getElementById("welcomeScreen").classList.add("d-none");
    document.getElementById("authContainer").classList.remove("d-none");
    document.getElementById("logoutBtn").classList.add("d-none");

    document.getElementById("loginEmail").value = "";
    document.getElementById("loginPassword").value = "";

    showLogin();
}

function signUp() {
    const name = document.getElementById("signUpName").value;
    const email = document.getElementById("signUpEmail").value;
    const password = document.getElementById("signUpPassword").value;
    const errorMessage = document.getElementById("signUpErrorMessage");

    if (!isValidEmail(email)) {
        errorMessage.textContent = "Invalid email format.";
        errorMessage.classList.remove("d-none");
        return;
    }

    if (!isValidPassword(password)) {
        errorMessage.textContent = "Password must be at least 6 characters and contain uppercase, lowercase, and number.";
        errorMessage.classList.remove("d-none");
        return;
    }

    if (users.find((u) => u.email === email)) {
        errorMessage.textContent = "Email is already registered.";
        errorMessage.classList.remove("d-none");
        return;
    }

    users.push({ name, email, password });

    errorMessage.textContent = "Account created successfully!";
    errorMessage.classList.remove("d-none");
    errorMessage.classList.replace("text-danger", "text-success");

}
