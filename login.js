// =====================================================
// ADMIN LOGIN
// =====================================================

// Default admin account for first-time login
const DEFAULT_EMAIL = "admin@hrm.com";
const DEFAULT_PASSWORD = "admin123";


// -----------------------------------------------------
// LOGIN
// -----------------------------------------------------

function loginAdmin() {

    const email = document.getElementById("adminEmail").value.trim();
    const password = document.getElementById("adminPassword").value;

    if (email === "" || password === "") {
        alert("Please enter email and password.");
        return;
    }

    let savedEmail = localStorage.getItem("adminEmail");
    let savedPassword = localStorage.getItem("adminPassword");

    // First-time setup
    if (savedEmail === null) {
        savedEmail = DEFAULT_EMAIL;
        localStorage.setItem("adminEmail", savedEmail);
    }

    if (savedPassword === null) {
        savedPassword = DEFAULT_PASSWORD;
        localStorage.setItem("adminPassword", savedPassword);
    }

    // Check login details
    if (email === savedEmail && password === savedPassword) {

        localStorage.setItem("adminLoggedIn", "true");

        alert("Login successful!");

        window.location.href = "index.html";

    } else {

        alert("Invalid email or password.");

    }
}


// -----------------------------------------------------
// FORGOT PASSWORD
// -----------------------------------------------------

function showForgotPassword() {

    document.getElementById("loginBox").classList.add("hidden");

    document.getElementById("forgotBox").classList.remove("hidden");
}


// -----------------------------------------------------
// BACK TO LOGIN
// -----------------------------------------------------

function backToLogin() {

    document.getElementById("forgotBox").classList.add("hidden");

    document.getElementById("loginBox").classList.remove("hidden");
}


// -----------------------------------------------------
// RESET PASSWORD
// -----------------------------------------------------

function resetPassword() {

    const email = document.getElementById("resetEmail").value.trim();

    const newPassword =
        document.getElementById("resetNewPassword").value;

    const confirmPassword =
        document.getElementById("resetConfirmPassword").value;


    if (email === "" || newPassword === "" || confirmPassword === "") {

        alert("Please fill all fields.");

        return;
    }


    const savedEmail =
        localStorage.getItem("adminEmail") || DEFAULT_EMAIL;


    if (email !== savedEmail) {

        alert("Admin email not found.");

        return;
    }


    if (newPassword.length < 6) {

        alert("Password must contain at least 6 characters.");

        return;
    }


    if (newPassword !== confirmPassword) {

        alert("New password and confirm password do not match.");

        return;
    }


    // Save new password
    localStorage.setItem("adminPassword", newPassword);

    alert("Password reset successfully! You can now login.");

    // Clear fields
    document.getElementById("resetEmail").value = "";
    document.getElementById("resetNewPassword").value = "";
    document.getElementById("resetConfirmPassword").value = "";

    // Go back to login
    backToLogin();
}


// -----------------------------------------------------
// BUTTON EVENTS
// -----------------------------------------------------

document
    .getElementById("loginBtn")
    .addEventListener("click", loginAdmin);


document
    .getElementById("forgotPasswordBtn")
    .addEventListener("click", showForgotPassword);


document
    .getElementById("resetPasswordBtn")
    .addEventListener("click", resetPassword);


document
    .getElementById("backToLoginBtn")
    .addEventListener("click", backToLogin);