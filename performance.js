const employeeData = [
    {
        id: "101",
        name: "Rahul Kumar",
        department: "IT",
        role: "Developer",
        joiningDate: "2023-01-15",
        performance: {
            taskCompletion: 92,
            attendance: 96
        }
    },
    {
        id: "102",
        name: "Sneha Reddy",
        department: "HR",
        role: "HR Executive",
        joiningDate: "2022-07-12",
        performance: {
            taskCompletion: 93,
            attendance: 98
        }
    },
    {
        id: "103",
        name: "Arjun Rao",
        department: "Finance",
        role: "Accountant",
        joiningDate: "2021-05-10",
        performance: {
            taskCompletion: 87,
            attendance: 90
        }
    },
    {
        id: "104",
        name: "Priya Sharma",
        department: "Operations",
        role: "Operations Executive",
        joiningDate: "2024-02-20",
        performance: {
            taskCompletion: 89,
            attendance: 94
        }
    },
    {
        id: "105",
        name: "Rahul Kumar",
        department: "Sales",
        role: "Sales Associate",
        joiningDate: "2022-11-14",
        performance: {
            taskCompletion: 90,
            attendance: 93
        }
    },
    {
        id: "106",
        name: "Sneha Reddy",
        department: "Support",
        role: "Support Specialist",
        joiningDate: "2023-04-08",
        performance: {
            taskCompletion: 91,
            attendance: 95
        }
    }
];

const employeeIdSearch = document.getElementById("employeeIdSearch");
const searchPerformanceButton = document.getElementById("searchPerformanceButton");
const performanceDetails = document.getElementById("performanceDetails");
const noMatchMessage = document.getElementById("noMatchMessage");
const breakdownBody = document.getElementById("breakdownBody");

function getDashboardEmployee(employeeId) {
    const storageKeys = ["employees", "hrmEmployees"];

    for (const storageKey of storageKeys) {
        const employees = JSON.parse(localStorage.getItem(storageKey) || "[]");
        const employee = employees.find(function(item) {
            return String(item.id).toLowerCase() === String(employeeId).toLowerCase();
        });

        if (employee && employee.name && !/^EMP\d+$/i.test(employee.name)) {
            return employee;
        }
    }

    return null;
}

function formatDate(dateString) {
    if (!dateString) return "-";

    const date = new Date(dateString + "T00:00:00");
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
}

function displayEmployeeByIdSearch() {
    const searchText = employeeIdSearch
        ? employeeIdSearch.value.trim().replace(/^0+(?=\d)/, "")
        : "";

    if (!searchText) {
        if (noMatchMessage) noMatchMessage.classList.add("hidden");
        if (performanceDetails) performanceDetails.classList.add("hidden");
        return;
    }

    let employee = employeeData.find(function(item) {
        return String(item.id).toLowerCase() === searchText.toLowerCase();
    });

    if (!employee) {
        const dashEmp = getDashboardEmployee(searchText);
        if (dashEmp) {
            employee = {
                id: dashEmp.id,
                name: dashEmp.name,
                department: dashEmp.department,
                role: dashEmp.role,
                joiningDate: dashEmp.joiningDate || "2024-01-01",
                performance: {
                    taskCompletion: 85,
                    attendance: 90
                }
            };
            employeeData.push(employee);
        }
    }

    if (!employee) {
        if (performanceDetails) performanceDetails.classList.add("hidden");
        if (noMatchMessage) noMatchMessage.classList.remove("hidden");
        return;
    }

    if (noMatchMessage) noMatchMessage.classList.add("hidden");
    updatePerformanceView(employee.id);
}

function clampPercentage(value) {
    const numericValue = Number(value) || 0;
    return Math.min(100, Math.max(0, numericValue));
}

function calculateOverallPerformance(performance) {
    const values = [
        performance.taskCompletion,
        performance.attendance
    ];

    const total = values.reduce(function(sum, currentValue) {
        return sum + clampPercentage(currentValue);
    }, 0);

    return Math.round(total / values.length);
}

function updateSummaryCards(performance) {
    document.getElementById("overallScore").textContent = calculateOverallPerformance(performance) + "%";
    document.getElementById("taskCompletion").textContent = clampPercentage(performance.taskCompletion) + "%";
    document.getElementById("attendancePercent").textContent = clampPercentage(performance.attendance) + "%";
}

function renderBreakdown(data) {
    if (!breakdownBody) return;
    breakdownBody.innerHTML = "";

    const rows = [
        { category: "Task Completion", field: "taskCompletion", target: "90%", value: data.taskCompletion },
        { category: "Attendance", field: "attendance", target: "95%", value: data.attendance }
    ];

    rows.forEach(function(item) {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${item.category}</td>
            <td>${item.target}</td>
            <td>
                <input
                    type="number"
                    min="0"
                    max="100"
                    value="${clampPercentage(item.value)}"
                    data-breakdown-field="${item.field}"
                    class="breakdown-input"
                >
            </td>
            <td class="score-cell">${clampPercentage(item.value)}%</td>
        `;

        breakdownBody.appendChild(row);
    });
}

function updatePerformanceView(selectedEmployeeId) {
    if (!selectedEmployeeId) {
        if (performanceDetails) performanceDetails.classList.add("hidden");
        return;
    }

    const employee = employeeData.find(function(item) {
        return String(item.id).toLowerCase() === String(selectedEmployeeId).toLowerCase();
    });

    if (!employee) {
        return;
    }

    const perf = employee.performance;
    const dashboardEmployee = getDashboardEmployee(employee.id) || employee;

    document.getElementById("detailEmployeeId").textContent = dashboardEmployee.id;
    document.getElementById("detailName").textContent = dashboardEmployee.name;
    document.getElementById("detailDepartment").textContent = dashboardEmployee.department;
    document.getElementById("detailRole").textContent = dashboardEmployee.role;
    document.getElementById("detailJoiningDate").textContent = formatDate(dashboardEmployee.joiningDate);

    updateSummaryCards(perf);
    renderBreakdown(perf);

    if (performanceDetails) performanceDetails.classList.remove("hidden");
}

if (breakdownBody) {
    breakdownBody.addEventListener("input", function(event) {
        const input = event.target;

        if (!input.matches("[data-breakdown-field]")) {
            return;
        }

        const selectedEmployeeId = employeeIdSearch.value.trim().replace(/^0+(?=\d)/, "");
        const employee = employeeData.find(function(item) {
            return String(item.id).toLowerCase() === selectedEmployeeId.toLowerCase();
        });

        if (!employee) {
            return;
        }

        const field = input.dataset.breakdownField;
        const value = clampPercentage(input.value);

        employee.performance[field] = value;
        input.value = value;

        const scoreCell = input.closest("tr").querySelector(".score-cell");
        if (scoreCell) {
            scoreCell.textContent = value + "%";
        }

        updateSummaryCards(employee.performance);
    });
}

if (employeeIdSearch) {
    employeeIdSearch.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            displayEmployeeByIdSearch();
        }
    });
}

if (searchPerformanceButton) {
    searchPerformanceButton.addEventListener("click", displayEmployeeByIdSearch);
}

if (performanceDetails) {
    performanceDetails.classList.add("hidden");
}
