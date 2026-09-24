// =====================================================
// DEPARTMENT MANAGEMENT SYSTEM
// =====================================================


// =====================================================
// GET CURRENT EMPLOYEES
// =====================================================

function getEmployees() {

    return JSON.parse(
        localStorage.getItem("employees")
    ) || [];

}


// =====================================================
// DEPARTMENT DATA
// =====================================================

let departments =
    JSON.parse(localStorage.getItem("departments")) || [

        {
            id: "DEPT001",
            name: "IT",
            head: "Rahul Kumar",
            description: "Information Technology Department"
        },

        {
            id: "DEPT002",
            name: "HR",
            head: "Sneha Reddy",
            description: "Human Resources Department"
        },

        {
            id: "DEPT003",
            name: "Finance",
            head: "Arjun Rao",
            description: "Finance and Accounts Department"
        }

    ];


// =====================================================
// SAVE DEPARTMENTS
// =====================================================

function saveDepartments() {

    localStorage.setItem(
        "departments",
        JSON.stringify(departments)
    );

}


// =====================================================
// DISPLAY DEPARTMENTS
// =====================================================

function displayDepartments() {

    // Always get the latest employees
    const employees = getEmployees();


    const departmentBody =
        document.getElementById("departmentBody");

    departmentBody.innerHTML = "";


    const searchValue =
        document
            .getElementById("departmentSearch")
            .value
            .toLowerCase();


    const filteredDepartments =
        departments.filter(function(department) {

            return (
                department.name
                    .toLowerCase()
                    .includes(searchValue)
                ||
                department.head
                    .toLowerCase()
                    .includes(searchValue)
            );

        });


    filteredDepartments.forEach(function(department) {


        // Count current employees in this department

        const employeeCount =
            employees.filter(function(employee) {

                return (
                    employee.department &&
                    employee.department
                        .toLowerCase() ===
                    department.name.toLowerCase()
                );

            }).length;


        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                ${department.id}
            </td>

            <td>
                ${department.name}
            </td>

            <td>
                ${department.head}
            </td>

            <td>
                ${employeeCount}
            </td>

            <td>
                ${department.description}
            </td>

            <td>

                <button
                    class="small-btn"
                    data-action="edit"
                    data-id="${department.id}">

                    Edit

                </button>

            </td>

            <td>

                <button
                    class="small-btn danger"
                    data-action="delete"
                    data-id="${department.id}">

                    Delete

                </button>

            </td>

        `;


        departmentBody.appendChild(row);

    });


    addDepartmentTableEvents();

    updateDepartmentSummary();

}


// =====================================================
// TABLE BUTTON EVENTS
// =====================================================

function addDepartmentTableEvents() {

    const buttons =
        document.querySelectorAll(
            "#departmentBody button"
        );


    buttons.forEach(function(button) {

        button.addEventListener(
            "click",
            function() {

                const departmentId =
                    this.getAttribute("data-id");


                const action =
                    this.getAttribute("data-action");


                if (action === "edit") {

                    editDepartment(departmentId);

                }


                if (action === "delete") {

                    deleteDepartment(departmentId);

                }

            }
        );

    });

}


// =====================================================
// OPEN FORM
// =====================================================

function openDepartmentForm() {

    document
        .getElementById("departmentForm")
        .classList
        .remove("hidden");

}


// =====================================================
// CLOSE FORM
// =====================================================

function closeDepartmentForm() {

    document
        .getElementById("departmentForm")
        .classList
        .add("hidden");


    document.getElementById(
        "departmentName"
    ).value = "";


    document.getElementById(
        "departmentHead"
    ).value = "";


    document.getElementById(
        "departmentDescription"
    ).value = "";

}


// =====================================================
// ADD / UPDATE DEPARTMENT
// =====================================================

function saveDepartment() {

    const name =
        document
            .getElementById("departmentName")
            .value
            .trim();


    const head =
        document
            .getElementById("departmentHead")
            .value
            .trim();


    const description =
        document
            .getElementById("departmentDescription")
            .value
            .trim();


    if (
        name === "" ||
        head === "" ||
        description === ""
    ) {

        alert(
            "Please fill all department details."
        );

        return;

    }


    const existingDepartment =
        departments.find(function(department) {

            return (
                department.name.toLowerCase() ===
                name.toLowerCase()
            );

        });


    if (existingDepartment) {

        existingDepartment.head = head;

        existingDepartment.description =
            description;


        saveDepartments();

        displayDepartments();

        closeDepartmentForm();


        alert(
            "Department updated successfully!"
        );

        return;

    }


    const departmentNumber =
        departments.length + 1;


    const departmentId =
        "DEPT" +
        String(departmentNumber).padStart(3, "0");


    const newDepartment = {

        id: departmentId,

        name: name,

        head: head,

        description: description

    };


    departments.push(
        newDepartment
    );


    saveDepartments();

    displayDepartments();

    closeDepartmentForm();


    alert(
        "Department added successfully!"
    );

}


// =====================================================
// EDIT DEPARTMENT
// =====================================================

function editDepartment(departmentId) {

    const department =
        departments.find(function(department) {

            return department.id === departmentId;

        });


    if (!department) {

        return;

    }


    document.getElementById(
        "departmentName"
    ).value =
        department.name;


    document.getElementById(
        "departmentHead"
    ).value =
        department.head;


    document.getElementById(
        "departmentDescription"
    ).value =
        department.description;


    openDepartmentForm();

}


// =====================================================
// DELETE DEPARTMENT
// =====================================================

function deleteDepartment(departmentId) {

    const confirmation =
        confirm(
            "Are you sure you want to delete this department?"
        );


    if (!confirmation) {

        return;

    }


    departments =
        departments.filter(function(department) {

            return department.id !== departmentId;

        });


    saveDepartments();

    displayDepartments();


    alert(
        "Department deleted successfully!"
    );

}


// =====================================================
// UPDATE SUMMARY
// =====================================================

function updateDepartmentSummary() {

    // Always get the latest employees
    const employees = getEmployees();


    document.getElementById(
        "departmentCount"
    ).textContent =
        departments.length;


    document.getElementById(
        "departmentEmployees"
    ).textContent =
        employees.length;

}


// =====================================================
// SEARCH
// =====================================================

function searchDepartments() {

    displayDepartments();

}


// =====================================================
// LOGOUT
// =====================================================

function logout() {

    alert(
        "Logged out successfully!"
    );

}


// =====================================================
// BUTTON EVENTS
// =====================================================

document
    .getElementById("addDepartmentBtn")
    .addEventListener(
        "click",
        openDepartmentForm
    );


document
    .getElementById("saveDepartmentBtn")
    .addEventListener(
        "click",
        saveDepartment
    );


document
    .getElementById("cancelDepartmentBtn")
    .addEventListener(
        "click",
        closeDepartmentForm
    );


document
    .getElementById("departmentSearch")
    .addEventListener(
        "input",
        searchDepartments
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

saveDepartments();

displayDepartments();