// =====================================================
// ATTENDANCE SYSTEM
// =====================================================


// =====================================================
// GET EMPLOYEES FROM LOCAL STORAGE
// Uses the same key as employees.js
// =====================================================

let employees =
    JSON.parse(localStorage.getItem("hrmEmployees")) || [];


// =====================================================
// GET ATTENDANCE RECORDS
// =====================================================

let attendanceRecords =
    JSON.parse(
        localStorage.getItem("attendanceRecords")
    ) || [];


// =====================================================
// SAVE ATTENDANCE
// =====================================================

function saveAttendance() {

    localStorage.setItem(
        "attendanceRecords",
        JSON.stringify(attendanceRecords)
    );

}


// =====================================================
// GET TODAY'S DATE
// =====================================================

function getToday() {

    const today = new Date();

    const year =
        today.getFullYear();

    const month =
        String(today.getMonth() + 1)
        .padStart(2, "0");

    const day =
        String(today.getDate())
        .padStart(2, "0");

    return `${year}-${month}-${day}`;

}


// =====================================================
// FORMAT DATE
// =====================================================

function formatDate(dateString) {

    if (!dateString) {
        return "";
    }

    const parts =
        dateString.split("-");

    return `${parts[2]}-${parts[1]}-${parts[0]}`;

}


// =====================================================
// REFRESH EMPLOYEES
// =====================================================

function refreshEmployees() {

    employees =
        JSON.parse(
            localStorage.getItem("hrmEmployees")
        ) || [];

}


// =====================================================
// LOAD EMPLOYEES INTO DROPDOWN
// =====================================================

function loadEmployees() {

    // Get latest employee data
    refreshEmployees();


    const employeeSelect =
        document.getElementById(
            "attendanceEmployee"
        );


    if (!employeeSelect) {
        return;
    }


    employeeSelect.innerHTML = `
        <option value="">
            Select Employee
        </option>
    `;


    employees.forEach(function(employee) {

        // Don't show employees who have exited
        if (employee.exitDate) {

            return;

        }


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
// DISPLAY SELECTED DATE
// =====================================================

function displaySelectedDate() {

    const date =
        document.getElementById(
            "attendanceDate"
        ).value;


    const dateText =
        document.getElementById(
            "selectedDateText"
        );


    if (!date) {

        dateText.textContent =
            "Please select a date";

        return;

    }


    dateText.textContent =
        "Attendance for " +
        formatDate(date);

}


// =====================================================
// DISPLAY ATTENDANCE
// =====================================================

function displayAttendance() {

    refreshEmployees();


    const selectedDate =
        document.getElementById(
            "attendanceDate"
        ).value;


    const attendanceBody =
        document.getElementById(
            "attendanceBody"
        );


    attendanceBody.innerHTML = "";


    let recordsForDate =
        attendanceRecords.filter(
            function(record) {

                return record.date === selectedDate;

            }
        );


    const searchInput =
        document.getElementById(
            "attendanceSearch"
        );


    const searchValue =
        searchInput
            ? searchInput.value.toLowerCase()
            : "";


    recordsForDate =
        recordsForDate.filter(
            function(record) {

                return record.name
                    .toLowerCase()
                    .includes(searchValue);

            }
        );


    recordsForDate.forEach(
        function(record) {

            const row =
                document.createElement("tr");


            let statusClass =
                "success";


            if (record.status === "Absent") {

                statusClass =
                    "danger";

            }


            if (
                record.status === "Late" ||
                record.status === "Half Day" ||
                record.status === "Leave"
            ) {

                statusClass =
                    "warning";

            }


            row.innerHTML = `

                <td>
                    ${record.employeeId}
                </td>

                <td>
                    ${record.name}
                </td>

                <td>
                    ${record.department}
                </td>

                <td>
                    ${formatDate(record.date)}
                </td>

                <td>

                    <span class="badge ${statusClass}">
                        ${record.status}
                    </span>

                </td>

                <td>

                    <button
                        class="small-btn"
                        data-action="edit"
                        data-id="${record.employeeId}"
                        data-date="${record.date}">

                        Edit

                    </button>


                    <button
                        class="small-btn danger"
                        data-action="delete"
                        data-id="${record.employeeId}"
                        data-date="${record.date}">

                        Delete

                    </button>

                </td>

            `;


            attendanceBody.appendChild(row);

        }
    );


    addTableEvents();

    updateSummary();

}


// =====================================================
// TABLE BUTTON EVENTS
// =====================================================

function addTableEvents() {

    const buttons =
        document.querySelectorAll(
            "#attendanceBody button"
        );


    buttons.forEach(
        function(button) {

            button.addEventListener(
                "click",
                function() {

                    const employeeId =
                        this.getAttribute(
                            "data-id"
                        );


                    const date =
                        this.getAttribute(
                            "data-date"
                        );


                    const action =
                        this.getAttribute(
                            "data-action"
                        );


                    if (action === "edit") {

                        editAttendance(
                            employeeId,
                            date
                        );

                    }


                    if (action === "delete") {

                        deleteAttendance(
                            employeeId,
                            date
                        );

                    }

                }
            );

        }
    );

}


// =====================================================
// OPEN ATTENDANCE FORM
// =====================================================

function openAttendanceForm() {

    refreshEmployees();

    loadEmployees();


    document
        .getElementById("attendanceForm")
        .classList
        .remove("hidden");

}


// =====================================================
// CLOSE ATTENDANCE FORM
// =====================================================

function closeAttendanceForm() {

    document
        .getElementById("attendanceForm")
        .classList
        .add("hidden");


    document.getElementById(
        "attendanceEmployee"
    ).value = "";


    document.getElementById(
        "attendanceStatus"
    ).value = "";

}


// =====================================================
// ADD OR UPDATE ATTENDANCE
// =====================================================

function saveAttendanceRecord() {

    refreshEmployees();


    const employeeId =
        document.getElementById(
            "attendanceEmployee"
        ).value;


    const status =
        document.getElementById(
            "attendanceStatus"
        ).value;


    const date =
        document.getElementById(
            "attendanceDate"
        ).value;


    if (
        employeeId === "" ||
        status === "" ||
        date === ""
    ) {

        alert(
            "Please select employee, date and attendance status."
        );

        return;

    }


    const employee =
        employees.find(
            function(employee) {

                return employee.id === employeeId;

            }
        );


    if (!employee) {

        alert(
            "Employee not found."
        );

        return;

    }


    const existingRecord =
        attendanceRecords.find(
            function(record) {

                return (
                    record.employeeId === employeeId &&
                    record.date === date
                );

            }
        );


    // UPDATE

    if (existingRecord) {

        existingRecord.status =
            status;


        saveAttendance();

        displayAttendance();

        closeAttendanceForm();


        alert(
            "Attendance updated successfully!"
        );

        return;

    }


    // CREATE NEW RECORD

    const newRecord = {

        employeeId:
            employee.id,

        name:
            employee.name,

        department:
            employee.department,

        date:
            date,

        status:
            status

    };


    attendanceRecords.push(
        newRecord
    );


    saveAttendance();


    displayAttendance();


    closeAttendanceForm();


    alert(
        "Attendance saved successfully!"
    );

}


// =====================================================
// EDIT ATTENDANCE
// =====================================================

function editAttendance(
    employeeId,
    date
) {

    refreshEmployees();

    loadEmployees();


    const record =
        attendanceRecords.find(
            function(record) {

                return (
                    record.employeeId === employeeId &&
                    record.date === date
                );

            }
        );


    if (!record) {

        return;

    }


    document.getElementById(
        "attendanceEmployee"
    ).value =
        record.employeeId;


    document.getElementById(
        "attendanceStatus"
    ).value =
        record.status;


    document.getElementById(
        "attendanceDate"
    ).value =
        record.date;


    displaySelectedDate();


    openAttendanceForm();

}


// =====================================================
// DELETE ATTENDANCE
// =====================================================

function deleteAttendance(
    employeeId,
    date
) {

    const confirmation =
        confirm(
            "Are you sure you want to delete this attendance?"
        );


    if (!confirmation) {

        return;

    }


    attendanceRecords =
        attendanceRecords.filter(
            function(record) {

                return !(
                    record.employeeId === employeeId &&
                    record.date === date
                );

            }
        );


    saveAttendance();


    displayAttendance();


    alert(
        "Attendance deleted successfully!"
    );

}


// =====================================================
// UPDATE SUMMARY
// =====================================================

function updateSummary() {

    refreshEmployees();


    const selectedDate =
        document.getElementById(
            "attendanceDate"
        ).value;


    const records =
        attendanceRecords.filter(
            function(record) {

                return record.date === selectedDate;

            }
        );


    document.getElementById(
        "totalEmployees"
    ).textContent =
        employees.filter(
            function(employee) {

                return !employee.exitDate;

            }
        ).length;


    document.getElementById(
        "presentCount"
    ).textContent =
        records.filter(
            function(record) {

                return record.status === "Present";

            }
        ).length;


    document.getElementById(
        "absentCount"
    ).textContent =
        records.filter(
            function(record) {

                return record.status === "Absent";

            }
        ).length;


    document.getElementById(
        "lateCount"
    ).textContent =
        records.filter(
            function(record) {

                return record.status === "Late";

            }
        ).length;

}


// =====================================================
// SEARCH
// =====================================================

function searchAttendance() {

    displayAttendance();

}


// =====================================================
// SET TODAY
// =====================================================

function setToday() {

    document.getElementById(
        "attendanceDate"
    ).value =
        getToday();


    displaySelectedDate();

    displayAttendance();

}


// =====================================================
// VIEW OLD ATTENDANCE
// =====================================================

function viewHistory() {

    const historyDate =
        document.getElementById(
            "historyDate"
        ).value;


    if (!historyDate) {

        alert(
            "Please select a date."
        );

        return;

    }


    document.getElementById(
        "attendanceDate"
    ).value =
        historyDate;


    displaySelectedDate();

    displayAttendance();

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
    .getElementById("addAttendanceBtn")
    .addEventListener(
        "click",
        openAttendanceForm
    );


document
    .getElementById("saveAttendanceBtn")
    .addEventListener(
        "click",
        saveAttendanceRecord
    );


document
    .getElementById("cancelAttendanceBtn")
    .addEventListener(
        "click",
        closeAttendanceForm
    );


document
    .getElementById("attendanceDate")
    .addEventListener(
        "change",
        function() {

            displaySelectedDate();

            displayAttendance();

        }
    );


document
    .getElementById("attendanceSearch")
    .addEventListener(
        "input",
        searchAttendance
    );


document
    .getElementById("todayBtn")
    .addEventListener(
        "click",
        setToday
    );


document
    .getElementById("viewHistoryBtn")
    .addEventListener(
        "click",
        viewHistory
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

document.getElementById(
    "attendanceDate"
).value =
    getToday();


document.getElementById(
    "historyDate"
).value =
    getToday();


loadEmployees();

displaySelectedDate();

displayAttendance();
// =====================================================
// FILTER ATTENDANCE BY STATUS
// =====================================================

function filterAttendanceRows(status) {

    const tbody = document.getElementById("attendanceBody");

    const rows = tbody.querySelectorAll("tr");

    rows.forEach(function(row) {

        // Status column is column 5
        // 0 = Employee ID
        // 1 = Employee Name
        // 2 = Department
        // 3 = Date
        // 4 = Status
        // 5 = Action

        const statusCell = row.cells[4];

        if (!statusCell) {
            return;
        }

        const rowStatus =
            statusCell.textContent.trim();

        if (status === "All") {

            row.style.display = "";

        } else if (rowStatus === status) {

            row.style.display = "";

        } else {

            row.style.display = "none";

        }

    });

}