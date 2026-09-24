// =====================================================
// DEPARTMENT EMPLOYEES SYSTEM
// =====================================================


// =====================================================
// GET & SAVE EMPLOYEES
// =====================================================

const DEFAULT_EMPLOYEES = [
    {
        id: "EMP001",
        name: "Vamsi Asadi",
        lead: "Ravi Kumar",
        department: "IT",
        role: "Lead Developer",
        email: "vamsi@example.com",
        joinDate: "01 Sep 2026, 01:51 PM",
        exitDate: "30 Sept 2026"
    },
    {
        id: "EMP002",
        name: "Rahul",
        lead: "Ravi Kumar",
        department: "IT",
        role: "Frontend Engineer",
        email: "rahul@example.com",
        joinDate: "15 Jan 2024, 09:30 AM",
        exitDate: "-"
    },
    {
        id: "EMP003",
        name: "Priya",
        lead: "Suresh",
        department: "IT",
        role: "Backend Engineer",
        email: "priya@example.com",
        joinDate: "20 Feb 2024, 10:15 AM",
        exitDate: "-"
    },
    {
        id: "EMP004",
        name: "Sneha Reddy",
        lead: "Sneha Reddy",
        department: "HR",
        role: "HR Manager",
        email: "sneha@example.com",
        joinDate: "01 Feb 2024, 10:00 AM",
        exitDate: "-"
    },
    {
        id: "EMP005",
        name: "Pooja Verma",
        lead: "Sneha Reddy",
        department: "HR",
        role: "Talent Acquisition",
        email: "pooja@example.com",
        joinDate: "12 Mar 2024, 11:00 AM",
        exitDate: "-"
    },
    {
        id: "EMP006",
        name: "Arjun Rao",
        lead: "Arjun Rao",
        department: "Finance",
        role: "Finance Lead",
        email: "arjun@example.com",
        joinDate: "10 Mar 2024, 09:15 AM",
        exitDate: "-"
    },
    {
        id: "EMP007",
        name: "Deepak Sharma",
        lead: "Priya Sharma",
        department: "Marketing",
        role: "Digital Marketer",
        email: "deepak@example.com",
        joinDate: "05 Apr 2024, 09:00 AM",
        exitDate: "-"
    },
    {
        id: "EMP008",
        name: "Rajesh Gupta",
        lead: "Vikas Patel",
        department: "Sales",
        role: "Account Executive",
        email: "rajesh@example.com",
        joinDate: "18 Apr 2024, 10:30 AM",
        exitDate: "-"
    }
];

function getEmployees() {
    const raw = localStorage.getItem("employees");
    if (!raw) {
        localStorage.setItem("employees", JSON.stringify(DEFAULT_EMPLOYEES));
        return DEFAULT_EMPLOYEES;
    }
    return JSON.parse(raw);
}

function saveEmployeesList(list) {
    localStorage.setItem("employees", JSON.stringify(list));
}


// =====================================================
// GET & SAVE DEPARTMENTS
// =====================================================

const DEFAULT_DEPARTMENTS = [
    { id: "DEPT001", name: "IT", head: "Ravi Kumar", description: "Information Technology Department" },
    { id: "DEPT002", name: "HR", head: "Sneha Reddy", description: "Human Resources Department" },
    { id: "DEPT003", name: "Finance", head: "Arjun Rao", description: "Finance and Accounts Department" },
    { id: "DEPT004", name: "Marketing", head: "Priya Sharma", description: "Marketing and Branding Department" },
    { id: "DEPT005", name: "Sales", head: "Vikas Patel", description: "Sales and Business Development" },
    { id: "DEPT006", name: "Operations", head: "Anita Roy", description: "Operations & Logistics" },
    { id: "DEPT007", name: "Administration", head: "Suresh Menon", description: "Administration Department" },
    { id: "DEPT008", name: "Support", head: "Kiran Das", description: "Customer Support & Helpdesk" }
];

function getDepartments() {
    const raw = localStorage.getItem("departments");
    if (!raw) {
        localStorage.setItem("departments", JSON.stringify(DEFAULT_DEPARTMENTS));
        return DEFAULT_DEPARTMENTS;
    }
    return JSON.parse(raw);
}

function saveDepartments(list) {
    localStorage.setItem("departments", JSON.stringify(list));
}


// =====================================================
// POPULATE DEPARTMENT DROPDOWN
// =====================================================

function populateDepartmentDropdown() {
    const departments = getDepartments();
    const deptDropdown = document.getElementById("departmentDropdown");

    if (deptDropdown) {
        const currentSelected = deptDropdown.value;
        deptDropdown.innerHTML = departments.map(dept => 
            `<option value="${dept.name}">${dept.name}</option>`
        ).join("");

        if (currentSelected && departments.some(d => d.name === currentSelected)) {
            deptDropdown.value = currentSelected;
        } else if (departments.length > 0) {
            deptDropdown.value = departments[0].name;
        }
    }
}


// =====================================================
// DISPLAY DEPARTMENT EMPLOYEES TABLE
// =====================================================

function displayDepartmentEmployees(selectedDept) {
    const deptDropdown = document.getElementById("departmentDropdown");
    const departments = getDepartments();
    const defaultDept = departments.length > 0 ? departments[0].name : "IT";
    const department = selectedDept || (deptDropdown && deptDropdown.value ? deptDropdown.value : defaultDept);
    const employees = getEmployees();
    const tableBody = document.getElementById("deptEmployeeTableBody");

    if (!tableBody) return;

    tableBody.innerHTML = "";

    const deptEmployees = employees.filter(emp => 
        (emp.department || "").trim().toLowerCase() === department.trim().toLowerCase()
    );

    // Update total employees count badge beside dropdown
    const countBadge = document.getElementById("selectedDeptCount");
    if (countBadge) {
        countBadge.textContent = deptEmployees.length;
    }

    if (deptEmployees.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="5" class="no-data-cell" style="text-align: center; padding: 32px; color: #64748b;">
                    ℹ️ No employees found for <strong>${department}</strong> department.
                </td>
            </tr>
        `;
        return;
    }

    deptEmployees.forEach(function(emp) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${emp.id}</td>
            <td>${emp.lead || "-"}</td>
            <td>${emp.name}</td>
            <td>${emp.department || "-"}</td>
            <td>${emp.role || "-"}</td>
        `;
        tableBody.appendChild(row);
    });
}

function onDepartmentSelectChange() {
    const deptDropdown = document.getElementById("departmentDropdown");
    if (deptDropdown) {
        displayDepartmentEmployees(deptDropdown.value);
    }
}


// =====================================================
// ADD DEPARTMENT MODAL HANDLERS
// =====================================================

function openAddDepartmentModal() {
    const modal = document.getElementById("addDepartmentModal");
    if (modal) {
        document.getElementById("addDepartmentForm").reset();
        modal.classList.add("active");
    }
}

function closeAddDepartmentModal() {
    const modal = document.getElementById("addDepartmentModal");
    if (modal) {
        modal.classList.remove("active");
    }
}

function saveNewDepartment(event) {
    event.preventDefault();
    const name = document.getElementById("departmentName").value.trim();
    const head = document.getElementById("departmentHead").value.trim();
    const description = document.getElementById("departmentDescription").value.trim();

    if (!name || !head) {
        alert("Please enter both Department Name and Department Head.");
        return;
    }

    let departments = getDepartments();
    const exists = departments.some(d => d.name.toLowerCase() === name.toLowerCase());

    if (exists) {
        alert(`Department "${name}" already exists in the HRM Portal!`);
        return;
    }

    const deptNumber = departments.length + 1;
    const newDept = {
        id: "DEPT" + String(deptNumber).padStart(3, "0"),
        name: name,
        head: head,
        description: description
    };

    departments.push(newDept);
    saveDepartments(departments);

    closeAddDepartmentModal();
    populateDepartmentDropdown();

    // Select the newly added department
    const deptDropdown = document.getElementById("departmentDropdown");
    if (deptDropdown) {
        deptDropdown.value = name;
        displayDepartmentEmployees(name);
    }
}


// =====================================================
// LOGOUT
// =====================================================

function logout() {
    localStorage.removeItem("adminLoggedIn");
    window.location.href = "login.html";
}

document.getElementById("logoutBtn")?.addEventListener("click", logout);


// =====================================================
// INITIAL LOAD
// =====================================================

populateDepartmentDropdown();
displayDepartmentEmployees();