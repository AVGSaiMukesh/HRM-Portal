const employeeData = [
    {
        id: "101",
        name: "Rahul Kumar",
        department: "IT",
        role: "Developer",
        joiningDate: "2023-01-15",
        performance: {
            overallScore: 88,
            taskCompletion: 92,
            attendance: 96,
            onTimeDelivery: 91,
            goalsAchieved: 85,
            qualityOfWork: 90,
            teamCollaboration: 88,
            breakdown: [
                { category: "Task Completion", target: "90%", achieved: "92%", score: 92 },
                { category: "Quality of Work", target: "85%", achieved: "90%", score: 90 },
                { category: "Attendance", target: "95%", achieved: "96%", score: 96 },
                { category: "On-Time Delivery", target: "90%", achieved: "91%", score: 91 },
                { category: "Team Collaboration", target: "80%", achieved: "88%", score: 88 },
                { category: "Goals Achieved", target: "85%", achieved: "85%", score: 85 }
            ],
            goals: [
                { task: "Project Sprint Delivery", assignedDate: "2026-08-01", dueDate: "2026-08-15", status: "Completed", progress: 100 },
                { task: "Bug Fix Cycle", assignedDate: "2026-08-16", dueDate: "2026-08-30", status: "In Progress", progress: 75 },
                { task: "Client Documentation", assignedDate: "2026-09-01", dueDate: "2026-09-20", status: "Pending", progress: 40 }
            ],
            feedback: {
                strengths: "Strong technical execution and quick issue resolution.",
                improvement: "Improve documentation consistency and deeper cross-team coordination.",
                comments: "This employee shows excellent ownership and is a reliable contributor for product delivery.",
                nextReviewDate: "2026-10-15"
            }
        }
    },
    {
        id: "102",
        name: "Sneha Reddy",
        department: "HR",
        role: "HR Executive",
        joiningDate: "2022-07-12",
        performance: {
            overallScore: 92,
            taskCompletion: 93,
            attendance: 98,
            onTimeDelivery: 94,
            goalsAchieved: 90,
            qualityOfWork: 92,
            teamCollaboration: 90,
            breakdown: [
                { category: "Task Completion", target: "90%", achieved: "93%", score: 93 },
                { category: "Quality of Work", target: "88%", achieved: "92%", score: 92 },
                { category: "Attendance", target: "97%", achieved: "98%", score: 98 },
                { category: "On-Time Delivery", target: "90%", achieved: "94%", score: 94 },
                { category: "Team Collaboration", target: "85%", achieved: "90%", score: 90 },
                { category: "Goals Achieved", target: "90%", achieved: "90%", score: 90 }
            ],
            goals: [
                { task: "Hiring Coordination", assignedDate: "2026-08-02", dueDate: "2026-08-21", status: "Completed", progress: 100 },
                { task: "Training Program Planning", assignedDate: "2026-08-22", dueDate: "2026-09-12", status: "In Progress", progress: 70 },
                { task: "Employee Engagement Survey", assignedDate: "2026-09-05", dueDate: "2026-09-25", status: "Pending", progress: 55 }
            ],
            feedback: {
                strengths: "Excellent communication, employee handling, and organizational skills.",
                improvement: "Continue improving speed in complex case handling and broader reporting.",
                comments: "This employee maintains consistent follow-through and strong employee engagement support.",
                nextReviewDate: "2026-10-20"
            }
        }
    },
    {
        id: "103",
        name: "Arjun Rao",
        department: "Finance",
        role: "Accountant",
        joiningDate: "2021-05-10",
        performance: {
            overallScore: 81,
            taskCompletion: 87,
            attendance: 90,
            onTimeDelivery: 86,
            goalsAchieved: 75,
            qualityOfWork: 82,
            teamCollaboration: 80,
            breakdown: [
                { category: "Task Completion", target: "85%", achieved: "87%", score: 87 },
                { category: "Quality of Work", target: "80%", achieved: "82%", score: 82 },
                { category: "Attendance", target: "92%", achieved: "90%", score: 90 },
                { category: "On-Time Delivery", target: "85%", achieved: "86%", score: 86 },
                { category: "Team Collaboration", target: "75%", achieved: "80%", score: 80 },
                { category: "Goals Achieved", target: "75%", achieved: "75%", score: 75 }
            ],
            goals: [
                { task: "Monthly Ledger Review", assignedDate: "2026-08-04", dueDate: "2026-08-18", status: "Completed", progress: 100 },
                { task: "Audit Preparation", assignedDate: "2026-08-19", dueDate: "2026-09-10", status: "In Progress", progress: 60 },
                { task: "Tax Filing Checklist", assignedDate: "2026-09-08", dueDate: "2026-09-30", status: "Pending", progress: 35 }
            ],
            feedback: {
                strengths: "Reliable finance tracking and strong attention to detail.",
                improvement: "Focus on reducing delays in audit-related tasks and report consistency.",
                comments: "This employee is dependable and accurate, though a little more focus on deadline management will help.",
                nextReviewDate: "2026-10-18"
            }
        }
    },
    {
        id: "104",
        name: "Priya Sharma",
        department: "Operations",
        role: "Operations Executive",
        joiningDate: "2024-02-20",
        performance: {
            overallScore: 84,
            taskCompletion: 89,
            attendance: 94,
            onTimeDelivery: 87,
            goalsAchieved: 80,
            qualityOfWork: 86,
            teamCollaboration: 82,
            breakdown: [
                { category: "Task Completion", target: "88%", achieved: "89%", score: 89 },
                { category: "Quality of Work", target: "82%", achieved: "86%", score: 86 },
                { category: "Attendance", target: "93%", achieved: "94%", score: 94 },
                { category: "On-Time Delivery", target: "85%", achieved: "87%", score: 87 },
                { category: "Team Collaboration", target: "78%", achieved: "82%", score: 82 },
                { category: "Goals Achieved", target: "80%", achieved: "80%", score: 80 }
            ],
            goals: [
                { task: "Shift Planning", assignedDate: "2026-08-05", dueDate: "2026-08-25", status: "Completed", progress: 100 },
                { task: "Vendor Follow-up", assignedDate: "2026-08-26", dueDate: "2026-09-15", status: "In Progress", progress: 68 },
                { task: "Process Audit", assignedDate: "2026-09-06", dueDate: "2026-09-22", status: "Pending", progress: 45 }
            ],
            feedback: {
                strengths: "Strong process awareness and fast task completion.",
                improvement: "Enhance reporting quality and improve follow-up consistency.",
                comments: "This employee is reliable and organized, with good day-to-day execution.",
                nextReviewDate: "2026-10-22"
            }
        }
    },
    {
        id: "105",
        name: "Rahul Kumar",
        department: "Sales",
        role: "Sales Associate",
        joiningDate: "2022-11-14",
        performance: {
            overallScore: 87,
            taskCompletion: 90,
            attendance: 93,
            onTimeDelivery: 88,
            goalsAchieved: 83,
            qualityOfWork: 89,
            teamCollaboration: 84,
            breakdown: [
                { category: "Task Completion", target: "89%", achieved: "90%", score: 90 },
                { category: "Quality of Work", target: "84%", achieved: "89%", score: 89 },
                { category: "Attendance", target: "92%", achieved: "93%", score: 93 },
                { category: "On-Time Delivery", target: "86%", achieved: "88%", score: 88 },
                { category: "Team Collaboration", target: "80%", achieved: "84%", score: 84 },
                { category: "Goals Achieved", target: "82%", achieved: "83%", score: 83 }
            ],
            goals: [
                { task: "Lead Conversion Review", assignedDate: "2026-08-07", dueDate: "2026-08-24", status: "Completed", progress: 100 },
                { task: "Client Follow-up", assignedDate: "2026-08-25", dueDate: "2026-09-18", status: "In Progress", progress: 72 },
                { task: "Sales Pipeline Check", assignedDate: "2026-09-07", dueDate: "2026-09-28", status: "Pending", progress: 50 }
            ],
            feedback: {
                strengths: "Good customer communication and consistent follow-up.",
                improvement: "Work on conversion consistency and stronger planning.",
                comments: "This employee shows strong communication skills and steady sales effort.",
                nextReviewDate: "2026-10-24"
            }
        }
    },
    {
        id: "106",
        name: "Sneha Reddy",
        department: "Support",
        role: "Support Specialist",
        joiningDate: "2023-04-08",
        performance: {
            overallScore: 89,
            taskCompletion: 91,
            attendance: 95,
            onTimeDelivery: 90,
            goalsAchieved: 86,
            qualityOfWork: 91,
            teamCollaboration: 86,
            breakdown: [
                { category: "Task Completion", target: "90%", achieved: "91%", score: 91 },
                { category: "Quality of Work", target: "88%", achieved: "91%", score: 91 },
                { category: "Attendance", target: "94%", achieved: "95%", score: 95 },
                { category: "On-Time Delivery", target: "88%", achieved: "90%", score: 90 },
                { category: "Team Collaboration", target: "82%", achieved: "86%", score: 86 },
                { category: "Goals Achieved", target: "85%", achieved: "86%", score: 86 }
            ],
            goals: [
                { task: "Support Ticket Resolution", assignedDate: "2026-08-09", dueDate: "2026-08-28", status: "Completed", progress: 100 },
                { task: "Knowledge Base Update", assignedDate: "2026-08-29", dueDate: "2026-09-16", status: "In Progress", progress: 74 },
                { task: "Escalation Review", assignedDate: "2026-09-10", dueDate: "2026-09-30", status: "Pending", progress: 48 }
            ],
            feedback: {
                strengths: "Quick problem solving and strong customer support.",
                improvement: "Improve ticket documentation consistency and escalation tracking.",
                comments: "This employee handles customer issues well and responds quickly.",
                nextReviewDate: "2026-10-29"
            }
        }
    }
];

const employeeIdSearch = document.getElementById("employeeIdSearch");
const searchPerformanceButton = document.getElementById("searchPerformanceButton");
const performanceDetails = document.getElementById("performanceDetails");
const breakdownBody = document.getElementById("breakdownBody");

function getDashboardEmployee(employeeId) {
    const storageKeys = ["employees", "hrmEmployees"];

    for (const storageKey of storageKeys) {
        const employees = JSON.parse(localStorage.getItem(storageKey) || "[]");
        const employee = employees.find(function(item) {
            return String(item.id) === String(employeeId);
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
        performanceDetails.classList.add("hidden");
        return;
    }

    const employee = employeeData.find(function(item) {
        return String(item.id) === searchText;
    });

    if (!employee) {
        performanceDetails.classList.add("hidden");
        return;
    }

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
        performanceDetails.classList.add("hidden");
        return;
    }

    const employee = employeeData.find(function(item) {
        return String(item.id) === String(selectedEmployeeId);
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

    performanceDetails.classList.remove("hidden");
}

if (breakdownBody) {
    breakdownBody.addEventListener("input", function(event) {
    const input = event.target;

    if (!input.matches("[data-breakdown-field]")) {
        return;
    }

    const selectedEmployeeId = employeeIdSearch.value.trim();
    const employee = employeeData.find(function(item) {
        return item.id === selectedEmployeeId;
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

performanceDetails.classList.add("hidden");
