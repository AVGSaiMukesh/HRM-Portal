// =====================================================
// DASHBOARD
// =====================================================


// -----------------------------------------------------
// GET EMPLOYEES
// -----------------------------------------------------

function getEmployees() {

    return JSON.parse(localStorage.getItem("employees")) || [];

}


// -----------------------------------------------------
// GET ATTENDANCE RECORDS
// -----------------------------------------------------

function getAttendanceRecords() {

    return JSON.parse(localStorage.getItem("attendanceRecords")) || [];

}


// -----------------------------------------------------
// GET LEAVE RECORDS
// -----------------------------------------------------

function getLeaveRecords() {

    return JSON.parse(localStorage.getItem("leaveRecords")) || [];

}


// -----------------------------------------------------
// GET PAYROLL RECORDS
// -----------------------------------------------------

function getPayrollRecords() {

    return JSON.parse(localStorage.getItem("payrollRecords")) || [];

}


// -----------------------------------------------------
// GET TODAY'S DATE
// -----------------------------------------------------

function getToday() {

    const today = new Date();

    const year = today.getFullYear();

    const month = String(today.getMonth() + 1).padStart(2, "0");

    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;

}


// -----------------------------------------------------
// UPDATE TOTAL EMPLOYEES
// -----------------------------------------------------

function updateEmployeeCount() {

    const employees = getEmployees();

    document.getElementById("employeeCount").textContent =
        employees.length;

}


// -----------------------------------------------------
// UPDATE PRESENT COUNT
// -----------------------------------------------------

function updatePresentCount() {

    const employees = getEmployees();

    const attendanceRecords = getAttendanceRecords();

    const today = getToday();

    let presentCount = 0;

    employees.forEach(function(employee) {

        const record = attendanceRecords.find(function(attendance) {

            return (
                attendance.employeeId === employee.id &&
                attendance.date === today
            );

        });

        if (record && record.status === "Present") {

            presentCount++;

        }

    });

    document.getElementById("presentCount").textContent =
        presentCount;

}


// -----------------------------------------------------
// UPDATE LEAVE COUNT
// -----------------------------------------------------

function updateLeaveCount() {

    const employees = getEmployees();

    const attendanceRecords = getAttendanceRecords();

    const leaveRecords = getLeaveRecords();

    const today = getToday();

    let leaveCount = 0;


    employees.forEach(function(employee) {

        let isOnLeave = false;


        // Check attendance
        const attendance = attendanceRecords.find(function(record) {

            return (
                record.employeeId === employee.id &&
                record.date === today &&
                record.status === "Leave"
            );

        });


        if (attendance) {

            isOnLeave = true;

        }


        // Check approved leave
        if (!isOnLeave) {

            const approvedLeave = leaveRecords.find(function(leave) {

                return (
                    leave.employeeId === employee.id &&
                    leave.status === "Approved" &&
                    today >= leave.startDate &&
                    today <= leave.endDate
                );

            });


            if (approvedLeave) {

                isOnLeave = true;

            }

        }


        if (isOnLeave) {

            leaveCount++;

        }

    });


    document.getElementById("leaveCount").textContent =
        leaveCount;

}


// -----------------------------------------------------
// UPDATE MONTHLY PAYROLL
// -----------------------------------------------------

function updatePayroll() {

    const payrollRecords = getPayrollRecords();

    let totalPayroll = 0;


    payrollRecords.forEach(function(record) {

        const netSalary = Number(record.netSalary) || 0;

        totalPayroll += netSalary;

    });


    const payrollElement =
        document.getElementById("monthlyPayroll");


    if (payrollElement) {

        payrollElement.textContent =
            "₹" + totalPayroll.toLocaleString("en-IN");

    }

}


// -----------------------------------------------------
// DISPLAY RECENT EMPLOYEES
// -----------------------------------------------------

const recentEmployeesPanel = document.getElementById("recentEmployeesPanel");
const dashboardGrid = document.querySelector(".dashboard-grid");

if (recentEmployeesPanel && dashboardGrid) {
    recentEmployeesPanel.addEventListener("dragstart", function(event) {
        event.dataTransfer.setData("text/plain", "recentEmployeesPanel");
        event.dataTransfer.effectAllowed = "move";
        recentEmployeesPanel.classList.add("dragging");
    });

    recentEmployeesPanel.addEventListener("dragend", function() {
        recentEmployeesPanel.classList.remove("dragging");
    });

    dashboardGrid.addEventListener("dragover", function(event) {
        event.preventDefault();
    });

    dashboardGrid.addEventListener("drop", function(event) {
        event.preventDefault();

        const targetPanel = event.target.closest(".panel");

        if (!targetPanel || targetPanel === recentEmployeesPanel) {
            return;
        }

        const panels = Array.from(dashboardGrid.querySelectorAll(".panel"));
        const currentIndex = panels.indexOf(recentEmployeesPanel);
        const targetIndex = panels.indexOf(targetPanel);

        if (currentIndex === -1 || targetIndex === -1) {
            return;
        }

        if (currentIndex < targetIndex) {
            dashboardGrid.insertBefore(recentEmployeesPanel, targetPanel.nextElementSibling);
        } else {
            dashboardGrid.insertBefore(recentEmployeesPanel, targetPanel);
        }
    });
}

function displayRecentEmployees() {

    const employees = getEmployees();

    const tableBody =
        document.getElementById("recentEmployeeBody");


    if (!tableBody) {

        return;

    }


    tableBody.innerHTML = "";


    // Show latest 5 employees
    const recentEmployees =
        employees.slice(-5).reverse();


    recentEmployees.forEach(function(employee) {

        const row = document.createElement("tr");


        let statusClass = "success";


        if (employee.status === "On Leave") {

            statusClass = "warning";

        }


        row.innerHTML = `

            <td>${employee.name}</td>

            <td>${employee.department}</td>

            <td>
                <span class="badge ${statusClass}">
                    ${employee.status || "Active"}
                </span>
            </td>

        `;


        tableBody.appendChild(row);

    });


    // If there are no employees
    if (recentEmployees.length === 0) {

        tableBody.innerHTML = `

            <tr>

                <td colspan="3" style="text-align:center;">
                    No employees found.
                </td>

            </tr>

        `;

    }

}


// -----------------------------------------------------
// UPDATE COMPLETE DASHBOARD
// -----------------------------------------------------

const DEFAULT_NOTIFICATIONS = [
    {
        id: 1,
        title: "Leave Request Submitted",
        desc: "Sarah Jenkins applied for 3 days of Annual Leave.",
        time: "10 mins ago",
        category: "leave",
        icon: "📅",
        unread: true
    },
    {
        id: 2,
        title: "New Employee Onboarded",
        desc: "Michael Chang joined the Engineering Department.",
        time: "45 mins ago",
        category: "employee",
        icon: "👤",
        unread: true
    },
    {
        id: 3,
        title: "Payroll Processed",
        desc: "March 2026 payroll batch processed successfully.",
        time: "2 hours ago",
        category: "payroll",
        icon: "💰",
        unread: true
    },
    {
        id: 4,
        title: "Late Attendance Alert",
        desc: "4 employees checked in after 09:30 AM today.",
        time: "5 hours ago",
        category: "attendance",
        icon: "⚠️",
        unread: false
    },
    {
        id: 5,
        title: "Work Anniversary 🎉",
        desc: "Emily Watson is celebrating 3 years at the company!",
        time: "1 day ago",
        category: "event",
        icon: "🎂",
        unread: false
    }
];

function getNotifications() {
    const saved = localStorage.getItem("notifications");
    if (!saved) {
        localStorage.setItem("notifications", JSON.stringify(DEFAULT_NOTIFICATIONS));
        return DEFAULT_NOTIFICATIONS;
    }
    return JSON.parse(saved);
}

function saveNotifications(notifications) {
    localStorage.setItem("notifications", JSON.stringify(notifications));
    renderNotifications();
}

function renderNotifications() {
    const notifications = getNotifications();
    const listEl = document.getElementById("notificationList");
    const badgeEl = document.getElementById("notificationBadge");
    const unreadCountTag = document.getElementById("unreadCountTag");

    if (!listEl) return;

    const unreadCount = notifications.filter(function(n) {
        return n.unread;
    }).length;

    if (badgeEl) {
        if (unreadCount > 0) {
            badgeEl.textContent = unreadCount;
            badgeEl.classList.remove("hidden");
        } else {
            badgeEl.classList.add("hidden");
        }
    }

    if (unreadCountTag) {
        unreadCountTag.textContent = unreadCount + " New";
    }

    if (notifications.length === 0) {
        listEl.innerHTML = `
            <div class="notification-empty">
                <span>🔕</span>
                <p>No notifications yet</p>
            </div>
        `;
        return;
    }

    listEl.innerHTML = notifications.map(function(item) {
        return `
        <div class="notification-item ${item.unread ? 'unread' : ''}" onclick="toggleNotificationRead(${item.id})">
            <div class="notif-icon-box ${item.category}">
                ${item.icon}
            </div>
            <div class="notif-body">
                <div class="notif-title">
                    <span>${item.title}</span>
                    <button class="notif-delete-btn" title="Remove notification" onclick="deleteNotification(event, ${item.id})">✕</button>
                </div>
                <div class="notif-desc">${item.desc}</div>
                <div class="notif-time">${item.time}</div>
            </div>
        </div>
    `;
    }).join("");
}

function toggleNotificationDropdown() {
    const dropdown = document.getElementById("notificationDropdown");
    if (dropdown) {
        dropdown.classList.toggle("active");
    }
}

function markAllNotificationsAsRead() {
    const notifications = getNotifications().map(function(item) {
        return {
            ...item,
            unread: false
        };
    });
    saveNotifications(notifications);
}

function toggleNotificationRead(id) {
    const notifications = getNotifications().map(function(item) {
        if (item.id === id) {
            return { ...item, unread: !item.unread };
        }
        return item;
    });
    saveNotifications(notifications);
}

function deleteNotification(event, id) {
    if (event) {
        event.stopPropagation();
    }
    const notifications = getNotifications().filter(function(item) {
        return item.id !== id;
    });
    saveNotifications(notifications);
}

function clearAllNotifications() {
    saveNotifications([]);
}

document.addEventListener("click", function(event) {
    const wrapper = document.getElementById("notificationWrapper");
    const dropdown = document.getElementById("notificationDropdown");
    if (wrapper && dropdown && dropdown.classList.contains("active")) {
        if (!wrapper.contains(event.target)) {
            dropdown.classList.remove("active");
        }
    }
});

function loadDashboard() {

    updateEmployeeCount();

    updatePresentCount();

    updateLeaveCount();

    updatePayroll();

    displayRecentEmployees();
    renderNotifications();

}


// -----------------------------------------------------
// LOGOUT
// -----------------------------------------------------

//function logout() {

   // localStorage.removeItem("adminLoggedIn");

   // alert("Logged out successfully!");

   // window.location.href = "login.html";

//}
// -----------------------------------------------------
// LOGOUT
// -----------------------------------------------------

function logout() {

    localStorage.removeItem("adminLoggedIn");

    window.location.href = "logout.html";

}


// -----------------------------------------------------
// START DASHBOARD
// -----------------------------------------------------

loadDashboard();