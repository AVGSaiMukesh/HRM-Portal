// =====================================================
// LEAVE MANAGEMENT SYSTEM
// =====================================================


// =====================================================
// GET EMPLOYEES
// =====================================================

let employees =
    JSON.parse(localStorage.getItem("employees")) || [];


// =====================================================
// GET LEAVE RECORDS
// =====================================================

let leaveRecords =
    JSON.parse(localStorage.getItem("leaveRecords")) || [];


// =====================================================
// SAVE LEAVE RECORDS
// =====================================================

function saveLeaves() {

    localStorage.setItem(
        "leaveRecords",
        JSON.stringify(leaveRecords)
    );

}


// =====================================================
// LOAD EMPLOYEES
// =====================================================

function loadEmployees() {

    const employeeSelect =
        document.getElementById(
            "leaveEmployee"
        );


    employeeSelect.innerHTML = `
        <option value="">
            Select Employee
        </option>
    `;


    employees.forEach(function(employee) {

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
// DISPLAY LEAVE RECORDS
// =====================================================

function displayLeaves() {

    const leaveBody =
        document.getElementById(
            "leaveBody"
        );


    leaveBody.innerHTML = "";


    const searchValue =
        document.getElementById(
            "leaveSearch"
        ).value.toLowerCase();


    let filteredLeaves =
        leaveRecords.filter(function(leave) {

            return (
                leave.name
                    .toLowerCase()
                    .includes(searchValue) ||

                leave.employeeId
                    .toLowerCase()
                    .includes(searchValue) ||

                leave.leaveType
                    .toLowerCase()
                    .includes(searchValue)
            );

        });


    filteredLeaves.forEach(function(leave) {

        const row =
            document.createElement("tr");


        let statusClass =
            "warning";


        if (leave.status === "Approved") {

            statusClass =
                "success";

        }


        if (leave.status === "Rejected") {

            statusClass =
                "danger";

        }


        row.innerHTML = `

    <td>
        ${leave.employeeId}
    </td>

    <td>
        ${leave.name}
    </td>

    <td>
        ${leave.leaveType}
    </td>

    <td>
        ${leave.startDate}
    </td>

    <td>
        ${leave.endDate}
    </td>

    <td>

        <span class="badge ${statusClass}">
            ${leave.status}
        </span>

    </td>


    <!-- ACTION 1 -->

    <td>

        <button
            class="small-btn"
            data-action="approve"
            data-id="${leave.id}">

            Approve

        </button>

    </td>


    <!-- ACTION 2 -->

    <td>

        <button
            class="small-btn"
            data-action="reject"
            data-id="${leave.id}">

            Reject

        </button>

    </td>


    <!-- DELETE -->

    <td>

        <button
            class="small-btn danger"
            data-action="delete"
            data-id="${leave.id}">

            Delete

        </button>

    </td>

`;


        leaveBody.appendChild(row);

    });


    addLeaveTableEvents();

    updateLeaveSummary();

}


// =====================================================
// TABLE BUTTON EVENTS
// =====================================================

function addLeaveTableEvents() {

    const buttons =
        document.querySelectorAll(
            "#leaveBody button"
        );


    buttons.forEach(function(button) {

        button.addEventListener(
            "click",
            function() {

                const leaveId =
                    this.getAttribute(
                        "data-id"
                    );


                const action =
                    this.getAttribute(
                        "data-action"
                    );


                if (action === "approve") {

                    approveLeave(leaveId);

                }


                if (action === "reject") {

                    rejectLeave(leaveId);

                }


                if (action === "delete") {

                    deleteLeave(leaveId);

                }

            }
        );

    });

}


// =====================================================
// OPEN FORM
// =====================================================

function openLeaveForm() {

    document
        .getElementById("leaveForm")
        .classList
        .remove("hidden");

}


// =====================================================
// CLOSE FORM
// =====================================================

function closeLeaveForm() {

    document
        .getElementById("leaveForm")
        .classList
        .add("hidden");


    document.getElementById(
        "leaveEmployee"
    ).value = "";


    document.getElementById(
        "leaveType"
    ).value = "";


    document.getElementById(
        "leaveStartDate"
    ).value = "";


    document.getElementById(
        "leaveEndDate"
    ).value = "";


    document.getElementById(
        "leaveReason"
    ).value = "";

}


// =====================================================
// APPLY LEAVE
// =====================================================

function saveLeave() {

    const employeeId =
        document.getElementById(
            "leaveEmployee"
        ).value;


    const leaveType =
        document.getElementById(
            "leaveType"
        ).value;


    const startDate =
        document.getElementById(
            "leaveStartDate"
        ).value;


    const endDate =
        document.getElementById(
            "leaveEndDate"
        ).value;


    const reason =
        document.getElementById(
            "leaveReason"
        ).value.trim();


    // CHECK FIELDS

    if (
        employeeId === "" ||
        leaveType === "" ||
        startDate === "" ||
        endDate === "" ||
        reason === ""
    ) {

        alert(
            "Please fill all leave details."
        );

        return;

    }


    // CHECK DATE

    if (endDate < startDate) {

        alert(
            "End date cannot be before start date."
        );

        return;

    }


    // FIND EMPLOYEE

    const employee =
        employees.find(function(employee) {

            return employee.id === employeeId;

        });


    if (!employee) {

        alert(
            "Employee not found."
        );

        return;

    }


    // CREATE ID

    const leaveId =
        "LEAVE" +
        Date.now();


    // CREATE RECORD

    const newLeave = {

        id:
            leaveId,

        employeeId:
            employee.id,

        name:
            employee.name,

        leaveType:
            leaveType,

        startDate:
            startDate,

        endDate:
            endDate,

        reason:
            reason,

        status:
            "Pending"

    };


    leaveRecords.push(
        newLeave
    );


    saveLeaves();

    displayLeaves();

    closeLeaveForm();


    alert(
        "Leave applied successfully!"
    );

}


// =====================================================
// APPROVE LEAVE
// =====================================================

function approveLeave(leaveId) {

    const leave =
        leaveRecords.find(function(leave) {

            return leave.id === leaveId;

        });


    if (!leave) {

        return;

    }


    leave.status =
        "Approved";


    saveLeaves();

    displayLeaves();


    alert(
        "Leave approved successfully!"
    );

}


// =====================================================
// REJECT LEAVE
// =====================================================

function rejectLeave(leaveId) {

    const leave =
        leaveRecords.find(function(leave) {

            return leave.id === leaveId;

        });


    if (!leave) {

        return;

    }


    leave.status =
        "Rejected";


    saveLeaves();

    displayLeaves();


    alert(
        "Leave rejected."
    );

}


// =====================================================
// DELETE LEAVE
// =====================================================

function deleteLeave(leaveId) {

    const confirmation =
        confirm(
            "Are you sure you want to delete this leave record?"
        );


    if (!confirmation) {

        return;

    }


    leaveRecords =
        leaveRecords.filter(function(leave) {

            return leave.id !== leaveId;

        });


    saveLeaves();

    displayLeaves();


    alert(
        "Leave record deleted successfully!"
    );

}


// =====================================================
// UPDATE SUMMARY
// =====================================================

function updateLeaveSummary() {

    document.getElementById(
        "totalLeave"
    ).textContent =
        leaveRecords.length;


    document.getElementById(
        "pendingLeave"
    ).textContent =
        leaveRecords.filter(function(leave) {

            return leave.status === "Pending";

        }).length;


    document.getElementById(
        "approvedLeave"
    ).textContent =
        leaveRecords.filter(function(leave) {

            return leave.status === "Approved";

        }).length;


    document.getElementById(
        "rejectedLeave"
    ).textContent =
        leaveRecords.filter(function(leave) {

            return leave.status === "Rejected";

        }).length;

}


// =====================================================
// SEARCH
// =====================================================

function searchLeaves() {

    displayLeaves();

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
    .getElementById("addLeaveBtn")
    .addEventListener(
        "click",
        openLeaveForm
    );


document
    .getElementById("saveLeaveBtn")
    .addEventListener(
        "click",
        saveLeave
    );


document
    .getElementById("cancelLeaveBtn")
    .addEventListener(
        "click",
        closeLeaveForm
    );


document
    .getElementById("leaveSearch")
    .addEventListener(
        "input",
        searchLeaves
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

displayLeaves();