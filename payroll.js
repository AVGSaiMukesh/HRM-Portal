// =====================================================
// PAYROLL MANAGEMENT SYSTEM
// =====================================================


// =====================================================
// GET EMPLOYEES
// =====================================================

let employees =
    JSON.parse(localStorage.getItem("employees")) || [];


// =====================================================
// GET PAYROLL RECORDS
// =====================================================

let payrollRecords =
    JSON.parse(localStorage.getItem("payrollRecords")) || [];


// =====================================================
// SAVE PAYROLL
// =====================================================

function savePayrollRecords() {

    localStorage.setItem(
        "payrollRecords",
        JSON.stringify(payrollRecords)
    );

}


// =====================================================
// LOAD EMPLOYEES
// =====================================================

function loadEmployees() {

    const employeeSelect =
        document.getElementById(
            "payrollEmployee"
        );


    employeeSelect.innerHTML = `
        <option value="">
            Select Employee
        </option>
    `;


    employees.forEach(function (employee) {

        const option =
            document.createElement("option");


        option.value =
            employee.id;


        option.textContent =
            `${employee.name} (${employee.id})`;


        employeeSelect.appendChild(option);

    });

}


// =====================================================
// DISPLAY PAYROLL RECORDS
// =====================================================

function displayPayroll() {

    const payrollBody =
        document.getElementById(
            "payrollBody"
        );


    payrollBody.innerHTML = "";


    const searchValue =
        document.getElementById(
            "payrollSearch"
        ).value.toLowerCase();


    let filteredRecords =
        payrollRecords.filter(function (record) {

            return (
                record.name
                    .toLowerCase()
                    .includes(searchValue) ||

                record.employeeId
                    .toLowerCase()
                    .includes(searchValue)
            );

        });


    filteredRecords.forEach(function (record) {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                ${record.employeeId}
            </td>

            <td>
                ${record.name}
            </td>

            <td>
                ₹${record.basicSalary.toLocaleString("en-IN")}
            </td>

            <td>
                ₹${record.allowance.toLocaleString("en-IN")}
            </td>

            <td>
                ₹${record.deduction.toLocaleString("en-IN")}
            </td>

            <td>
                ₹${record.netSalary.toLocaleString("en-IN")}
            </td>


            <!-- ACTION -->

            <td>

                <button
                    class="small-btn"
                    data-action="edit"
                    data-id="${record.id}">

                    Edit

                </button>

            </td>


            <!-- DELETE -->

            <td>

                <button
                    class="small-btn danger"
                    data-action="delete"
                    data-id="${record.id}">

                    Delete

                </button>

            </td>

        `;


        payrollBody.appendChild(row);

    });


    addPayrollTableEvents();

    updatePayrollSummary();

}


// =====================================================
// TABLE BUTTON EVENTS
// =====================================================

function addPayrollTableEvents() {

    const buttons =
        document.querySelectorAll(
            "#payrollBody button"
        );


    buttons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const payrollId =
                    this.getAttribute(
                        "data-id"
                    );


                const action =
                    this.getAttribute(
                        "data-action"
                    );


                if (action === "edit") {

                    editPayroll(
                        payrollId
                    );

                }


                if (action === "delete") {

                    deletePayroll(
                        payrollId
                    );

                }

            }
        );

    });

}


// =====================================================
// OPEN PAYROLL FORM
// =====================================================

function openPayrollForm() {

    document
        .getElementById("payrollForm")
        .classList
        .remove("hidden");

}


// =====================================================
// CLOSE PAYROLL FORM
// =====================================================

function closePayrollForm() {

    document
        .getElementById("payrollForm")
        .classList
        .add("hidden");


    document.getElementById(
        "payrollEmployee"
    ).value = "";


    document.getElementById(
        "basicSalary"
    ).value = "";


    document.getElementById(
        "allowance"
    ).value = "";


    document.getElementById(
        "deduction"
    ).value = "";

}


// =====================================================
// SAVE PAYROLL RECORD
// =====================================================

function savePayroll() {

    const employeeId =
        document.getElementById(
            "payrollEmployee"
        ).value;


    const basicSalary =
        Number(
            document.getElementById(
                "basicSalary"
            ).value
        );


    const allowance =
        Number(
            document.getElementById(
                "allowance"
            ).value
        );


    const deduction =
        Number(
            document.getElementById(
                "deduction"
            ).value
        );


    // CHECK EMPLOYEE

    if (employeeId === "") {

        alert(
            "Please select an employee."
        );

        return;

    }


    // CHECK SALARY

    if (
        basicSalary <= 0 ||
        allowance < 0 ||
        deduction < 0
    ) {

        alert(
            "Please enter valid salary details."
        );

        return;

    }


    // FIND EMPLOYEE

    const employee =
        employees.find(function (employee) {

            return employee.id === employeeId;

        });


    if (!employee) {

        alert(
            "Employee not found."
        );

        return;

    }


    // CHECK EXISTING PAYROLL

    const existingRecord =
        payrollRecords.find(function (record) {

            return record.employeeId === employeeId;

        });


    // CALCULATE NET SALARY

    const netSalary =
        basicSalary +
        allowance -
        deduction;


    // UPDATE EXISTING RECORD

    if (existingRecord) {

        existingRecord.basicSalary =
            basicSalary;

        existingRecord.allowance =
            allowance;

        existingRecord.deduction =
            deduction;

        existingRecord.netSalary =
            netSalary;


        savePayrollRecords();

        displayPayroll();

        closePayrollForm();


        alert(
            "Payroll updated successfully!"
        );

        return;

    }


    // CREATE NEW RECORD

    const newPayroll = {

        id:
            "PAY" + Date.now(),

        employeeId:
            employee.id,

        name:
            employee.name,

        basicSalary:
            basicSalary,

        allowance:
            allowance,

        deduction:
            deduction,

        netSalary:
            netSalary

    };


    payrollRecords.push(
        newPayroll
    );


    savePayrollRecords();

    displayPayroll();

    closePayrollForm();


    alert(
        "Payroll saved successfully!"
    );

}


// =====================================================
// EDIT PAYROLL
// =====================================================

function editPayroll(payrollId) {

    const record =
        payrollRecords.find(function (record) {

            return record.id === payrollId;

        });


    if (!record) {

        return;

    }


    document.getElementById(
        "payrollEmployee"
    ).value =
        record.employeeId;


    document.getElementById(
        "basicSalary"
    ).value =
        record.basicSalary;


    document.getElementById(
        "allowance"
    ).value =
        record.allowance;


    document.getElementById(
        "deduction"
    ).value =
        record.deduction;


    openPayrollForm();

}


// =====================================================
// DELETE PAYROLL
// =====================================================

function deletePayroll(payrollId) {

    const confirmation =
        confirm(
            "Are you sure you want to delete this payroll record?"
        );


    if (!confirmation) {

        return;

    }


    payrollRecords =
        payrollRecords.filter(function (record) {

            return record.id !== payrollId;

        });


    savePayrollRecords();

    displayPayroll();


    alert(
        "Payroll record deleted successfully!"
    );

}


// =====================================================
// UPDATE SUMMARY
// =====================================================

function updatePayrollSummary() {

    const totalBasic =
        payrollRecords.reduce(
            function (total, record) {

                return total +
                    record.basicSalary;

            },
            0
        );


    const totalAllowance =
        payrollRecords.reduce(
            function (total, record) {

                return total +
                    record.allowance;

            },
            0
        );


    const totalNetSalary =
        payrollRecords.reduce(
            function (total, record) {

                return total +
                    record.netSalary;

            },
            0
        );


    document.getElementById(
        "payrollEmployees"
    ).textContent =
        payrollRecords.length;


    document.getElementById(
        "totalBasic"
    ).textContent =
        "₹" +
        totalBasic.toLocaleString("en-IN");


    document.getElementById(
        "totalAllowance"
    ).textContent =
        "₹" +
        totalAllowance.toLocaleString("en-IN");


    document.getElementById(
        "totalNetSalary"
    ).textContent =
        "₹" +
        totalNetSalary.toLocaleString("en-IN");

}


// =====================================================
// SEARCH
// =====================================================

function searchPayroll() {

    displayPayroll();

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
    .getElementById("addPayrollBtn")
    .addEventListener(
        "click",
        openPayrollForm
    );


document
    .getElementById("savePayrollBtn")
    .addEventListener(
        "click",
        savePayroll
    );


document
    .getElementById("cancelPayrollBtn")
    .addEventListener(
        "click",
        closePayrollForm
    );


document
    .getElementById("payrollSearch")
    .addEventListener(
        "input",
        searchPayroll
    );


document
    .getElementById("logoutBtn")
    .addEventListener(
        "click",
        logout
    );


// =====================================================
// PAGE LOAD
// =====================================================

loadEmployees();

displayPayroll();