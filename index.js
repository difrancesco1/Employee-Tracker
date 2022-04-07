const mysql = require('mysql2');
const inquirer = require("inquirer");
const table = require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "tracker"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    askQuestions();
});

function askQuestions() {
    inquirer.prompt({
        message: "Please choose a task that you would like to do :)",
        type: "list",
        choices: [
            "add department",
            "view all departments",
            "add role",
            "view all roles",
            "add employee",
            "view all employees",
            "update employee role",
            "QUIT"
        ],
        name: "choice"
    }).then(answers => {
        console.log(answers.choice);
        switch (answers.choice) {
            case "add department":
                addDepartment()
                break;

            case "view all departments":
                viewDepartments()
                break;

            case "add role":
                addRole()
                break;    

            case "view all roles":
                viewRoles()
                break;

            case "add employee":
                addEmployee()
                break;

            case "view all employees":
                viewEmployees()
                break;

            case "update employee role":
                updateEmployeeRole();
                break;

            default:
                connection.end()
                break;
        }
    })
}

function viewEmployees() {
    connection.query("SELECT * FROM employees", function (err, data) {
        console.table(data);
        askQuestions();
    })
}

function viewDepartments() {
    connection.query("SELECT * FROM departments", function (err, data) {
        console.table(data);
        askQuestions();
    })
}

function viewRoles() {
    connection.query("SELECT * FROM roles", function (err, data) {
        console.table(data);
        askQuestions();
    })
}

function addEmployee() {
    inquirer.prompt([{
            type: "input",
            name: "firstName",
            message: "Please insert the employee's first name?"
        },
        {
            type: "input",
            name: "lastName",
            message: "Please insert the employee's last name?"
        },
        {
            type: "number",
            name: "roleId",
            message: "Please insert the employee's role ID"
        },
        {
            type: "number",
            name: "managerId",
            message: "Please insert the employee's manager's ID?"
        }
    ]).then(function(res) {
        connection.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [res.firstName, res.lastName, res.roleId, res.managerId], function(err, data) {
            if (err) throw err;
            console.table("Success!");
            askQuestions();
        })
    })
}

function addDepartment() {
    inquirer.prompt([{
        type: "input",
        name: "department",
        message: "What is the department that you want to add?"
    }, ]).then(function(res) {
        connection.query('INSERT INTO departments (name) VALUES (?)', [res.department], function(err, data) {
            if (err) throw err;
            console.table("Success!");
            askQuestions();
        })
    })
}

function addRole() {
    inquirer.prompt([
        {
            message: "Please enter title:",
            type: "input",
            name: "title"
        }, {
            message: "Please enter salary:",
            type: "number",
            name: "salary"
        }, {
            message: "Please enter department ID:",
            type: "number",
            name: "department_id"
        }
    ]).then(function (response) {
        connection.query("INSERT INTO roles (title, salary, department_id) values (?, ?, ?)", [response.title, response.salary, response.department_id], function (err, data) {
            console.table(data);
        })
        askQuestions();
    })

}

function updateEmployeeRole() {
    inquirer.prompt([
        {
            message: "Please insert the first name of the employee would you like to update?",
            type: "input",
            name: "name"
        }, {
            message: "enter the employees new role ID:",
            type: "number",
            name: "role_id"
        }
    ]).then(function (response) {
        connection.query("UPDATE employee SET role_id = ? WHERE first_name = ?", [response.role_id, response.name], function (err, data) {
            console.table(data);
        })
        askQuestions();
    })

}