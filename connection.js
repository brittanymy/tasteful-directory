const inquirer = require("inquirer");
const mysql = require("mysql2");
require("dotenv").config();
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.password,
  database: "employees_db",
});

require("console.table");

function findDepartments(callback) {
  db.query("SELECT * FROM department;", function (err, data) {
    if (err) throw err;
    console.table(data);
    callback();
  });
}

function findRoles(callback) {
  db.query(
    "SELECT role.id, role.title, role.salary, department.name, role.department_id FROM role LEFT JOIN department ON role.department_id = department.id;",
    function (err, data) {
      if (err) throw err;
      console.table(data);
      callback();
    }
  );
}

function findEmployees(callback) {
  db.query(
    "SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, employee.manager_id FROM employee LEFT JOIN role ON employee.role_id = role.id;",
    function (err, data) {
      if (err) throw err;
      console.table(data);
      callback();
    }
  );
}

function createDepartment(name, callback) {
  db.query(
    "INSERT INTO DEPARTMENT (name) VALUES (?);",
    name,
    function (err, data) {
      if (err) throw err;
      console.table(data);
      callback();
    }
  );
}

function createRole(title, salary, callback) {
  db.query("SELECT * FROM department;", function (err, ddepartment) {
    if (err) throw err;
    const choices = ddepartment.map((drecord) => ({
      name: drecord.name,
      value: drecord.id,
    }));
    inquirer
      .prompt([
        {
          type: "list",
          name: "choice",
          message: "What is the department this role is in?",
          choices,
        },
      ])
      .then(({ choice }) => {
        db.query(
          "INSERT INTO ROLE (title, salary, department_id) VALUES (?, ?, ?)",
          [title, salary, choice],
          function (err, data) {
            if (err) throw err;
            console.table(data);
            callback();
          }
        );
      });
  });
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

db.connect(function (err) {
  if (err) throw err;
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
