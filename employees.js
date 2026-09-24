// ======================================================
// EMPLOYEE STORAGE
// ======================================================

const STORAGE_KEY = "hrmEmployees";


// ======================================================
// GET EMPLOYEES
// ======================================================

function getEmployees() {

    return JSON.parse(
        localStorage.getItem(STORAGE_KEY)
    ) || [];

}


// ======================================================
// SAVE EMPLOYEES
// ======================================================

function saveEmployees(employees) {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(employees)
    );

}


// ======================================================
// INITIAL EMPLOYEES
// ======================================================

function initializeEmployees() {

    let employees = getEmployees();

    if (employees.length === 0) {

        employees = [

            {
                id: "EMP001",
                name: "Rahul Kumar",
                email: "rahul@example.com",
                mobile: "9876543210",
                department: "IT",
                role: "Developer",
                joiningDate: "2024-01-15",
                exitDate: ""
            },

            {
                id: "EMP002",
                name: "Sneha Reddy",
                email: "sneha@example.com",
                mobile: "9123456780",
                department: "HR",
                role: "HR Executive",
                joiningDate: "2023-03-10",
                exitDate: ""
            },

            {
                id: "EMP003",
                name: "Arjun Rao",
                email: "arjun@example.com",
                mobile: "9988776655",
                department: "Finance",
                role: "Accountant",
                joiningDate: "2022-07-22",
                exitDate: "2026-09-30"
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

    const employeeBody =
        document.getElementById("employeeBody");

    if (!employeeBody) {
        return;
    }

    employeeBody.innerHTML = "";


    employees.forEach(function(employee) {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                ${employee.id}
            </td>

            <td>
                ${employee.name}
            </td>

            <td>
                ${employee.email}
            </td>

            <td>
                ${employee.mobile || "-"}
            </td>

            <td>
                ${employee.department}
            </td>

            <td>
                ${employee.role}
            </td>

            <td>

                <span class="joining-date">

                    ${formatDate(employee.joiningDate)}

                </span>

            </td>

            <td>

                ${
                    employee.exitDate

                    ? `
                        <span class="exit-date">
                            ${formatDate(employee.exitDate)}
                        </span>
                      `

                    : `
                        <span class="working-date">
                            Working
                        </span>
                      `
                }

            </td>

            <!-- DELETE -->

            <td>

                <button
                    class="small-btn danger"
                    onclick="deleteEmployee('${employee.id}')">

                    Delete

                </button>

            </td>


            <!-- EDIT -->

            <td>

                <button
                    class="small-btn"
                    onclick="editEmployee('${employee.id}')">

                    Edit

                </button>

            </td>

        `;


        employeeBody.appendChild(row);

    });

}


// ======================================================
// OPEN ADD EMPLOYEE FORM
// ======================================================

function openEmployeeForm() {

    const form =
        document.getElementById("employeeForm");

    form.classList.remove("hidden");


    // Set form to ADD mode

    document.getElementById(
        "employeeFormTitle"
    ).textContent = "Add Employee";


    const saveButton =
        document.getElementById(
            "saveEmployeeBtn"
        );


    saveButton.textContent =
        "Save Employee";


    saveButton.onclick =
        addEmployee;

}


// ======================================================
// CLOSE EMPLOYEE FORM
// ======================================================

function closeEmployeeForm() {

    const form =
        document.getElementById("employeeForm");

    form.classList.add("hidden");


    clearEmployeeForm();


    // Reset button to ADD mode

    document.getElementById(
        "employeeFormTitle"
    ).textContent = "Add Employee";


    const saveButton =
        document.getElementById(
            "saveEmployeeBtn"
        );


    saveButton.textContent =
        "Save Employee";


    saveButton.onclick =
        addEmployee;

}


// ======================================================
// CLEAR FORM
// ======================================================

function clearEmployeeForm() {

    document.getElementById(
        "empName"
    ).value = "";


    document.getElementById(
        "empEmail"
    ).value = "";


    document.getElementById(
        "empMobile"
    ).value = "";


    document.getElementById(
        "empDepartment"
    ).value = "";


    document.getElementById(
        "empRole"
    ).value = "";


    document.getElementById(
        "empJoiningDate"
    ).value = "";


    document.getElementById(
        "empExitDate"
    ).value = "";

}


// ======================================================
// ADD EMPLOYEE
// ======================================================

function addEmployee() {

    const name =
        document.getElementById(
            "empName"
        ).value.trim();


    const email =
        document.getElementById(
            "empEmail"
        ).value.trim();


    const mobile =
        document.getElementById(
            "empMobile"
        ).value.trim();


    const department =
        document.getElementById(
            "empDepartment"
        ).value.trim();


    const role =
        document.getElementById(
            "empRole"
        ).value.trim();


    const joiningDate =
        document.getElementById(
            "empJoiningDate"
        ).value;


    const exitDate =
        document.getElementById(
            "empExitDate"
        ).value;


    // ==================================================
    // VALIDATION
    // ==================================================

    if (
        name === "" ||
        email === "" ||
        mobile === "" ||
        department === "" ||
        role === "" ||
        joiningDate === ""
    ) {

        alert(
            "Please fill all required fields."
        );

        return;
    }


    // Mobile validation

    if (
        !/^[0-9]{10}$/.test(mobile)
    ) {

        alert(
            "Please enter a valid 10-digit mobile number."
        );

        return;
    }


    // ==================================================
    // GET EXISTING EMPLOYEES
    // ==================================================

    const employees =
        getEmployees();


    // ==================================================
    // GENERATE ID
    // ==================================================

    const employeeId =
        generateEmployeeId(
            employees
        );


    // ==================================================
    // CREATE EMPLOYEE
    // ==================================================

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


    // ==================================================
    // ADD
    // ==================================================

    employees.push(employee);


    // ==================================================
    // SAVE
    // ==================================================

    saveEmployees(employees);


    // ==================================================
    // REFRESH TABLE
    // ==================================================

    displayEmployees(
        employees
    );


    // ==================================================
    // CLOSE FORM
    // ==================================================

    closeEmployeeForm();


    alert(
        "Employee added successfully!"
    );

}


// ======================================================
// EDIT EMPLOYEE
// ======================================================

function editEmployee(employeeId) {

    const employees =
        getEmployees();


    const employee =
        employees.find(
            function(emp) {

                return emp.id === employeeId;

            }
        );


    if (!employee) {

        alert(
            "Employee not found."
        );

        return;
    }


    // ==================================================
    // LOAD EMPLOYEE DETAILS INTO FORM
    // ==================================================

    document.getElementById(
        "empName"
    ).value = employee.name;


    document.getElementById(
        "empEmail"
    ).value = employee.email;


    document.getElementById(
        "empMobile"
    ).value =
        employee.mobile || "";


    document.getElementById(
        "empDepartment"
    ).value = employee.department;


    document.getElementById(
        "empRole"
    ).value = employee.role;


    document.getElementById(
        "empJoiningDate"
    ).value = employee.joiningDate;


    document.getElementById(
        "empExitDate"
    ).value =
        employee.exitDate || "";


    // ==================================================
    // CHANGE FORM TO EDIT MODE
    // ==================================================

    document.getElementById(
        "employeeFormTitle"
    ).textContent =
        "Edit Employee";


    const saveButton =
        document.getElementById(
            "saveEmployeeBtn"
        );


    saveButton.textContent =
        "Update Employee";


    saveButton.onclick =
        function() {

            updateEmployee(
                employeeId
            );

        };


    // ==================================================
    // SHOW FORM
    // ==================================================

    document.getElementById(
        "employeeForm"
    ).classList.remove(
        "hidden"
    );

}


// ======================================================
// UPDATE EMPLOYEE
// ======================================================

function updateEmployee(employeeId) {

    const employees =
        getEmployees();


    const employeeIndex =
        employees.findIndex(
            function(emp) {

                return emp.id === employeeId;

            }
        );


    if (employeeIndex === -1) {

        alert(
            "Employee not found."
        );

        return;
    }


    // ==================================================
    // GET UPDATED VALUES
    // ==================================================

    const name =
        document.getElementById(
            "empName"
        ).value.trim();


    const email =
        document.getElementById(
            "empEmail"
        ).value.trim();


    const mobile =
        document.getElementById(
            "empMobile"
        ).value.trim();


    const department =
        document.getElementById(
            "empDepartment"
        ).value.trim();


    const role =
        document.getElementById(
            "empRole"
        ).value.trim();


    const joiningDate =
        document.getElementById(
            "empJoiningDate"
        ).value;


    const exitDate =
        document.getElementById(
            "empExitDate"
        ).value;


    // ==================================================
    // VALIDATION
    // ==================================================

    if (
        name === "" ||
        email === "" ||
        mobile === "" ||
        department === "" ||
        role === "" ||
        joiningDate === ""
    ) {

        alert(
            "Please fill all required fields."
        );

        return;
    }


    if (
        !/^[0-9]{10}$/.test(mobile)
    ) {

        alert(
            "Please enter a valid 10-digit mobile number."
        );

        return;
    }


    // ==================================================
    // UPDATE EMPLOYEE
    // ==================================================

    employees[employeeIndex] = {

        id: employeeId,

        name: name,

        email: email,

        mobile: mobile,

        department: department,

        role: role,

        joiningDate: joiningDate,

        exitDate: exitDate

    };


    // ==================================================
    // SAVE UPDATED DATA
    // ==================================================

    saveEmployees(
        employees
    );


    // ==================================================
    // REFRESH TABLE
    // ==================================================

    displayEmployees(
        employees
    );


    // ==================================================
    // CLOSE FORM
    // ==================================================

    closeEmployeeForm();


    alert(
        "Employee details updated successfully!"
    );

}


// ======================================================
// DELETE EMPLOYEE
// ======================================================

function deleteEmployee(employeeId) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this employee?"
        );


    if (!confirmDelete) {
        return;
    }


    let employees =
        getEmployees();


    employees =
        employees.filter(
            function(employee) {

                return employee.id !== employeeId;

            }
        );


    saveEmployees(
        employees
    );


    displayEmployees(
        employees
    );

}


// ======================================================
// SEARCH EMPLOYEES
// ======================================================

function searchEmployees() {

    const searchInput =
        document.getElementById(
            "employeeSearch"
        );


    const searchText =
        searchInput.value
            .toLowerCase()
            .trim();


    const employees =
        getEmployees();


    const filteredEmployees =
        employees.filter(
            function(employee) {

                return (

                    employee.id
                        .toLowerCase()
                        .includes(
                            searchText
                        )

                    ||

                    employee.name
                        .toLowerCase()
                        .includes(
                            searchText
                        )

                    ||

                    employee.email
                        .toLowerCase()
                        .includes(
                            searchText
                        )

                    ||

                    (
                        employee.mobile || ""
                    )
                        .includes(
                            searchText
                        )

                    ||

                    employee.department
                        .toLowerCase()
                        .includes(
                            searchText
                        )

                    ||

                    employee.role
                        .toLowerCase()
                        .includes(
                            searchText
                        )

                );

            }
        );


    displayEmployees(
        filteredEmployees
    );

}


// ======================================================
// GENERATE EMPLOYEE ID
// ======================================================

function generateEmployeeId(
    employees
) {

    let maxNumber = 0;


    employees.forEach(
        function(employee) {

            const match =
                employee.id.match(
                    /EMP(\d+)/
                );


            if (match) {

                const number =
                    parseInt(
                        match[1]
                    );


                if (
                    number > maxNumber
                ) {

                    maxNumber =
                        number;

                }

            }

        }
    );


    return "EMP" +
        String(
            maxNumber + 1
        ).padStart(
            3,
            "0"
        );

}


// ======================================================
// FORMAT DATE
// ======================================================

function formatDate(
    dateString
) {

    if (!dateString) {
        return "-";
    }


    const date =
        new Date(
            dateString +
            "T00:00:00"
        );


    return date.toLocaleDateString(
        "en-GB",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}


// ======================================================
// LOGOUT
// ======================================================

function logout() {

    if (
        confirm(
            "Are you sure you want to logout?"
        )
    ) {

        window.location.href =
            "login.html";

    }

}


// ======================================================
// PAGE LOAD
// ======================================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        initializeEmployees();

    }
);