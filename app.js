// Establish routes
const { prompt } = require("inquirer");

const {
    findDepartments,
    findRoles,
    findEmployees,
    createDepartment,
    createRole,
    createEmployee,
    editEmployee,
} = require("./connection");

const consoleTable = require("console.table");

// Main question prompt
async function questionPrompt() {
    const response = await prompt ({
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: [
            {
                name: "View departments",
                value: "view_departments",
            },
            {
                name: "View roles",
                value: "view_roles",
            },
            {
                name: "View employees",
                value: "view_employees",
            },
            {
                name: "Add department",
                value: "add_department",
            },
            {
                name: "Add role",
                value: "add_role",
            },
            {
                name: "Add employee",
                value: "add_employee",
            },
            {
                name: "Update employee role",
                value: "update_employees",
            },
            {
                name: "Exit",
                value: "exit",
            },
        ]
    });

    const choice = response.choice;

    switch (choice) {
        case "view_departments":
            return viewDepartments();
        case "view_roles":
            return viewRoles();
        case "view_employees":
            return viewEmployees();
        case "add_department":
            return addDepartment();
        case "add_role":
            return addRole();
        case "add_employee":
            return addEmployee();
        case "update_employees":
            return updateEmployees();  
        case "exit":
            return quit();         
    }
}

// Add data to console.table
// View department function
function viewDepartments() {
    findDepartments(questionPrompt);
}

// View role function
function viewRoles() {
    findRoles(questionPrompt);
}

// View employee function
function viewEmployees() {
     findEmployees(questionPrompt);
}

// Allows user to add department to table
async function addDepartment() {
    const response = await prompt([
        {
            type: "input",
            name: "department",
            message: "What is the name of the department you'd like to add?",
        },
    ]);

    createDepartment(response.department,viewDepartments);
}

// Allows user to add role to table
async function addRole() {

    const response = await prompt ([
        {
            type: "input",
            name: "title",
            message: "What is the name of the role you'd like to add?",
        },
        {
            type: "input",
            name: "salary",
            message: "What is the salary of the role you'd like to add?",
        },
        // {
        //     type: "input",
        //     name: "choice",
        //     message: "What is the department this role is in?",
        //     choices,
        // },
    ]);

  // const salaryInt = parseInt(response.salary);

    // const [createRoleRows] = await 
    createRole (
        response.title,
        response.salary,viewRoles
    );
}

// Allows user to add an employee to table 
async function addEmployee() {
    const [employeeRows] = await findEmployees();

    const employeeChoices = employeeRows.map((employee) => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id,
    }));

    const [roleRows] = await findRoles();

    const roleChoices = roleRows.map((role) => ({
        name: role.title,
        value: role.id,
    }));

    const { firstName, lastName, roleChoice, employeeChoice } = await prompt ([
        {
            type: "input",
            name: "firstName",
            message: "What is the first name of the employee you'd like to add?",   
        },
        {
            type: "input",
            name: "lastName",
            message: "What is the last name of the employee you'd like to add?",   
        }, 
        {
            type: "list",
            name: "roleChoices",
            message: "What is the job title of the employee you'd like to add?",
            choices: "",   
        },
        {
            type: "list",
            name: "employeeChoices",
            message: "Who is the manage of the employee you'd like to add?",
            choices: "",   
        },  
    ]);

    createEmployee(firstName, lastName, roleChoice, employeeChoice);

    viewEmployees();
}

// Allows user to update employee roles
async function updateEmployees() {
    const [employeeRows] = await findEmployees();

    const employeeChoices = employeeRows.map((employee) => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id, 
    }));

    const [roleRows] = await findRoles();

    const roleChoices = roleRows.map((role) => ({
        name: role.title,
        value: role.id,
    }));

    const { employeeChoice, roleChoice } = await prompt ([
        {
            type: "list",
            name: "employeeChoice",
            message: "What is the name of the employee whose role you'd like to update?",
            choices: employeeChoices,
        },
        {
            type: "list",
            name: "roleChoice",
            message: "What is the new role for this employee?",
            choices: roleChoices,
        },
    ]);

    editEmployee(roleChoice, employeeChoice);

    viewEmployees();
}

// Allows user to quit the prompt
function quit() {
    console.log("Thank you!");
    process.exit();
}

// Calls function to run
questionPrompt();