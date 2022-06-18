// Establish routes
const { application } = require("express");
const db = require("./connection")

async function findDepartments() {
    return db.query("SELECT * FROM department;");
}

async function findRoles() {
    return db.query(
        "SELECT role.id, role.title, role.salary, department.name, role.department_id FROM role LEFT JOIN department ON role.department_id = department.id;"
    );
}

async function findEmployees() {
    return db.query(
        "SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, employee.manager_id FROM employee LEFT JOIN role ON employee.role_id = role.id;"
    );
}

async function createDepartment(name) {
    return db.query("INSERT INTO DEPARTMENT (name) VALUES (?);", name);
}

async function createRole(title, salary, department_id) {
    return db.query(
        "INSERT INTO ROLE (title, salary, department_id) VALUES (?, ?, ?)",
        [title, salary, department_id]
    );
}

async function createEmployee(firstName, lastName, role, manager) {
    return db.query(
        "INSERT INTO EMPLOYEE (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);",
        [firstName, lastName, role, manager]
    );
}

async function editEmployee(roleId, employeeId) {
    return db.query("UPDATE EMPLOYEE SET role_id = ? WHERE id = ?;", [
        roleId,
        employeeId,
    ]);
}

// Connect to port
db.connect((err) => {
    if (err) throw err;
        console.log("Database connected.");
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});

module.exports = {
    findDepartments,
    findRoles,
    findEmployees,
    createDepartment,
    createRole,
    createEmployee,
    editEmployee,  
};