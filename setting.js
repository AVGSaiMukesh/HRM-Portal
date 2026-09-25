// =====================================================
// SETTINGS MANAGEMENT
// =====================================================


// =====================================================
// LOAD PROFILE SETTINGS
// =====================================================

function loadProfileSettings() {

    const profile =
        JSON.parse(localStorage.getItem("adminProfile")) || {
            name: "Admin",
            email: "",
            role: "HR Manager"
        };

    document.getElementById("adminName").value = profile.name;
    document.getElementById("adminEmail").value = profile.email;
    document.getElementById("adminRole").value = profile.role;
}


// =====================================================
// SAVE PROFILE
// =====================================================

function saveProfile() {

    const name =
        document.getElementById("adminName").value.trim();

    const email =
        document.getElementById("adminEmail").value.trim();

    const role =
        document.getElementById("adminRole").value.trim();


    if (name === "" || email === "" || role === "") {

        alert("Please fill all profile details.");
        return;

    }


    const profile = {
        name: name,
        email: email,
        role: role
    };


    localStorage.setItem(
        "adminProfile",
        JSON.stringify(profile)
    );


    alert("Profile saved successfully!");
}


// =====================================================
// CHANGE PASSWORD
// =====================================================

function changePassword() {

    const currentPassword =
        document.getElementById("currentPassword").value;

    const newPassword =
        document.getElementById("newPassword").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;


    if (
        currentPassword === "" ||
        newPassword === "" ||
        confirmPassword === ""
    ) {

        alert("Please fill all password fields.");
        return;

    }


    if (newPassword.length < 6) {

        alert("New password must contain at least 6 characters.");
        return;

    }


    if (newPassword !== confirmPassword) {

        alert("New password and confirm password do not match.");
        return;

    }


    const savedPassword =
        localStorage.getItem("adminPassword");


    if (savedPassword === null) {

        localStorage.setItem(
            "adminPassword",
            newPassword
        );


        clearPasswordFields();


        alert("Password created successfully!");
        return;

    }


    if (currentPassword !== savedPassword) {

        alert("Current password is incorrect.");
        return;

    }


    localStorage.setItem(
        "adminPassword",
        newPassword
    );


    clearPasswordFields();


    alert("Password changed successfully!");
}


// =====================================================
// CLEAR PASSWORD FIELDS
// =====================================================

function clearPasswordFields() {

    document.getElementById(
        "currentPassword"
    ).value = "";

    document.getElementById(
        "newPassword"
    ).value = "";

    document.getElementById(
        "confirmPassword"
    ).value = "";

}


// =====================================================
// OPEN FORGOT PASSWORD
// =====================================================

function openForgotPassword() {

    document
        .getElementById("resetPasswordForm")
        .classList
        .remove("hidden");

}


// =====================================================
// CANCEL RESET PASSWORD
// =====================================================

function cancelResetPassword() {

    document
        .getElementById("resetPasswordForm")
        .classList
        .add("hidden");


    document.getElementById(
        "resetNewPassword"
    ).value = "";


    document.getElementById(
        "resetConfirmPassword"
    ).value = "";

}


// =====================================================
// RESET PASSWORD
// =====================================================

function resetPassword() {

    const newPassword =
        document.getElementById(
            "resetNewPassword"
        ).value;


    const confirmPassword =
        document.getElementById(
            "resetConfirmPassword"
        ).value;


    if (
        newPassword === "" ||
        confirmPassword === ""
    ) {

        alert(
            "Please enter and confirm your new password."
        );

        return;

    }


    if (newPassword.length < 6) {

        alert(
            "Password must contain at least 6 characters."
        );

        return;

    }


    if (newPassword !== confirmPassword) {

        alert(
            "New password and confirm password do not match."
        );

        return;

    }


    // Save new password

    localStorage.setItem(
        "adminPassword",
        newPassword
    );


    // Clear reset fields

    document.getElementById(
        "resetNewPassword"
    ).value = "";


    document.getElementById(
        "resetConfirmPassword"
    ).value = "";


    // Hide reset form

    document
        .getElementById("resetPasswordForm")
        .classList
        .add("hidden");


    alert(
        "Password reset successfully!"
    );

}


// =====================================================
// LOAD NOTIFICATION SETTINGS
// =====================================================

function loadNotificationSettings() {

    const notifications =
        JSON.parse(
            localStorage.getItem("notificationSettings")
        ) || {

            leave: true,
            attendance: true,
            payroll: true

        };


    document.getElementById(
        "leaveNotification"
    ).checked = notifications.leave;


    document.getElementById(
        "attendanceNotification"
    ).checked = notifications.attendance;


    document.getElementById(
        "payrollNotification"
    ).checked = notifications.payroll;

}


// =====================================================
// SAVE NOTIFICATION SETTINGS
// =====================================================

function saveNotificationSettings() {

    const notifications = {

        leave:
            document.getElementById(
                "leaveNotification"
            ).checked,

        attendance:
            document.getElementById(
                "attendanceNotification"
            ).checked,

        payroll:
            document.getElementById(
                "payrollNotification"
            ).checked

    };


    localStorage.setItem(
        "notificationSettings",
        JSON.stringify(notifications)
    );


    alert(
        "Notification settings saved successfully!"
    );

}


// =====================================================
// LOAD SYSTEM SETTINGS
// =====================================================

function loadSystemSettings() {

    const settings =
        JSON.parse(
            localStorage.getItem("systemSettings")
        ) || {

            compactMode: false,
            confirmDelete: true

        };


    document.getElementById(
        "compactMode"
    ).checked = settings.compactMode;


    document.getElementById(
        "confirmDelete"
    ).checked = settings.confirmDelete;

}


// =====================================================
// SAVE SYSTEM SETTINGS
// =====================================================

function saveSystemSettings() {

    const settings = {

        compactMode:
            document.getElementById(
                "compactMode"
            ).checked,

        confirmDelete:
            document.getElementById(
                "confirmDelete"
            ).checked

    };


    localStorage.setItem(
        "systemSettings",
        JSON.stringify(settings)
    );


    alert(
        "System settings saved successfully!"
    );

}



// =====================================================
// LOGOUT
// =====================================================

function logout() {

    localStorage.removeItem("adminLoggedIn");

    window.location.href = "login.html";

}


// =====================================================
// BUTTON EVENTS
// =====================================================

document
    .getElementById("saveProfileBtn")
    .addEventListener(
        "click",
        saveProfile
    );


document
    .getElementById("changePasswordBtn")
    .addEventListener(
        "click",
        changePassword
    );


document
    .getElementById("forgotPasswordBtn")
    .addEventListener(
        "click",
        openForgotPassword
    );


document
    .getElementById("resetPasswordBtn")
    .addEventListener(
        "click",
        resetPassword
    );


document
    .getElementById("cancelResetBtn")
    .addEventListener(
        "click",
        cancelResetPassword
    );


document
    .getElementById("saveNotificationBtn")
    .addEventListener(
        "click",
        saveNotificationSettings
    );


document
    .getElementById("saveSystemBtn")
    .addEventListener(
        "click",
        saveSystemSettings
    );


document
    .getElementById("logoutBtn")
    .addEventListener(
        "click",
        logout
    );


// =====================================================
// INITIAL LOAD
// =====================================================

loadProfileSettings();

loadNotificationSettings();

loadSystemSettings();