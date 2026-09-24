// ======================================================
// EMPLOYEES DATA
// ======================================================

const STORAGE_KEY = "hrmEmployees";


// ======================================================
// GET EMPLOYEES
// ======================================================

function getEmployees() {

    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

}


// ======================================================
// SAVE EMPLOYEES
// ======================================================

function saveEmployees(employees) {

    localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));

}


// ======================================================
// INITIAL EMPLOYEE DATA
// ======================================================

function initializeEmployees() {

    let employees = getEmployees();

    if (employees.length === 0) {

        employees = [
            {
                id: "101",
                name: "EMP1",
                email: "emp1@example.com",
                mobile: "9876543210",
                department: "IT",
                role: "Developer",
                joiningDate: "2024-01-15",
                exitDate: ""
            },
            {
                id: "102",
                name: "EMP2",
                email: "emp2@example.com",
                mobile: "9123456780",
                department: "HR",
                role: "HR Executive",
                joiningDate: "2023-03-10",
                exitDate: ""
            },
            {
                id: "103",
                name: "EMP3",
                email: "emp3@example.com",
                mobile: "9988776655",
                department: "Finance",
                role: "Accountant",
                joiningDate: "2022-07-22",
                exitDate: "2026-09-30"
            },
            {
                id: "104",
                name: "EMP4",
                email: "emp4@example.com",
                mobile: "9012345678",
                department: "Operations",
                role: "Coordinator",
                joiningDate: "2024-04-12",
                exitDate: ""
            },
            {
                id: "105",
                name: "EMP5",
                email: "emp5@example.com",
                mobile: "9988774411",
                department: "Sales",
                role: "Executive",
                joiningDate: "2023-11-08",
                exitDate: ""
            },
            {
                id: "106",
                name: "EMP6",
                email: "emp6@example.com",
                mobile: "9876123456",
                department: "Support",
                role: "Support Engineer",
                joiningDate: "2024-02-20",
                exitDate: ""
            }
        ];

        saveEmployees(employees);
    }

    displayEmployees(employees);
}


// ======================================================
// DISPLAY EMPLOYEES
// ======================================================

function displayEmployees(employees) {

    const employeeBody = document.getElementById("employeeBody");

    if (!employeeBody) {
        return;
    }

    employeeBody.innerHTML = "";

    employees.forEach(function(employee) {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${employee.id}</td>
            <td>${employee.name || "-"}</td>
            <td>${employee.email}</td>
            <td>${employee.mobile || "-"}</td>
            <td>${employee.department}</td>
            <td>${employee.role}</td>
            <td><span class="joining-date">${formatDate(employee.joiningDate)}</span></td>
            <td>
                ${employee.exitDate ? `<span class="exit-date">${formatDate(employee.exitDate)}</span>` : `<span class="working-date">Working</span>`}
            </td>
            <td>
                <button class="small-btn danger" onclick="deleteEmployee('${employee.id}')">Delete</button>
            </td>
        `;

        employeeBody.appendChild(row);
    });
}


// ======================================================
// OPEN EMPLOYEE FORM
// ======================================================

function openEmployeeForm() {

    const form = document.getElementById("employeeForm");

    if (form) {
        form.classList.remove("hidden");
    }
}


// ======================================================
// CLOSE EMPLOYEE FORM
// ======================================================

function closeEmployeeForm() {

    const form = document.getElementById("employeeForm");

    if (form) {
        form.classList.add("hidden");
    }

    clearEmployeeForm();
}


// ======================================================
// CLEAR FORM
// ======================================================

function clearEmployeeForm() {

    const nameField = document.getElementById("empName");
    const emailField = document.getElementById("empEmail");
    const mobileField = document.getElementById("empMobile");
    const departmentField = document.getElementById("empDepartment");
    const roleField = document.getElementById("empRole");
    const joiningField = document.getElementById("empJoiningDate");
    const exitField = document.getElementById("empExitDate");

    if (nameField) nameField.value = "";
    if (emailField) emailField.value = "";
    if (mobileField) mobileField.value = "";
    if (departmentField) departmentField.value = "";
    if (roleField) roleField.value = "";
    if (joiningField) joiningField.value = "";
    if (exitField) exitField.value = "";
}


// ======================================================
// ADD EMPLOYEE
// ======================================================

function addEmployee() {

    const name = document.getElementById("empName").value.trim();
    const email = document.getElementById("empEmail").value.trim();
    const mobile = document.getElementById("empMobile").value.trim();
    const department = document.getElementById("empDepartment").value.trim();
    const role = document.getElementById("empRole").value.trim();
    const joiningDate = document.getElementById("empJoiningDate").value;
    const exitDate = document.getElementById("empExitDate").value;

    if (!name || !email || !mobile || !department || !role || !joiningDate) {
        alert("Please fill all required fields.");
        return;
    }

    if (!/^[0-9]{10}$/.test(mobile)) {
        alert("Please enter a valid 10-digit mobile number.");
        return;
    }

    const employees = getEmployees();
    const employeeId = generateEmployeeId(employees);

    const employee = {
        id: employeeId,
        name: name,
        email: email,
        mobile: mobile,
        department: department,
        role: role,
        joiningDate: joiningDate,
        exitDate: exitDate
    };

    employees.push(employee);
    saveEmployees(employees);
    displayEmployees(employees);
    closeEmployeeForm();
    alert("Employee added successfully!");
}


// ======================================================
// GENERATE EMPLOYEE ID
// ======================================================

function generateEmployeeId(employees) {

    let maxNumber = 0;

    employees.forEach(function(employee) {
        const numericId = Number(employee.id);

        if (!isNaN(numericId) && numericId > maxNumber) {
            maxNumber = numericId;
        }
    });

    return String(maxNumber + 1);
}


// ======================================================
// FORMAT DATE
// ======================================================

function formatDate(dateString) {

    if (!dateString) {
        return "-";
    }

    const date = new Date(dateString + "T00:00:00");

    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
}


// ======================================================
// DELETE EMPLOYEE
// ======================================================

function deleteEmployee(employeeId) {

    if (!confirm("Are you sure you want to delete this employee?")) {
        return;
    }

    let employees = getEmployees();
    employees = employees.filter(employee => employee.id !== employeeId);
    saveEmployees(employees);
    displayEmployees(employees);
}


// ======================================================
// SEARCH EMPLOYEES
// ======================================================

function searchEmployees() {

    const searchInput = document.getElementById("employeeSearch");
    const searchText = searchInput.value.toLowerCase().trim();
    const employees = getEmployees();

    const filteredEmployees = employees.filter(function(employee) {
        return String(employee.id).toLowerCase().includes(searchText);
    });

    displayEmployees(filteredEmployees);
}


// ======================================================
// LOGOUT
// ======================================================

function logout() {

    if (confirm("Are you sure you want to logout?")) {
        window.location.href = "login.html";
    }
}


// ======================================================
// PAGE LOAD
// ======================================================

document.addEventListener("DOMContentLoaded", function() {
    initializeEmployees();
});
