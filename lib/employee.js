const db = require('../db/connection');
const inquirer = require('inquirer');
const { viewAllRoles } = require('./role');
  
// Get all employees
const viewAllEmployees = () => {
    const sql = `select employee.id AS id, 
    employee.first_name AS first_name, 
    employee.last_name AS last_name, 
    role.title AS job_title, 
    role.salary AS salary, 
    department.name AS department, 
    CONCAT(manager.first_name,' ', manager.last_name) AS manager from employee 
    LEFT JOIN role ON role_id = role.id 
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee manager on manager.id = employee.manager_id;`;

    return new Promise((resolve, reject) => {
    db.query(sql, (err, rows) => {
        if (err) {
            reject(err)
        }
        resolve(rows)
        });
    })
}

//add employee
const addEmployee = async () => {
    console.log(`Add an employee`)
    await inquirer.prompt([{
        type: 'text',
        name: 'firstname',
        message: 'Enter the employee\'s first name:',
        validate: nameInput_1 => {
            if (nameInput_1) {
                return true;
            } else {
                console.log('Enter a first name');
            return false;
            }
        }
    },
    {
        type: 'text',
        name: 'lastname',
        message: 'Enter the employee\'s last name:',
        validate: nameInput_1 => {
            if (nameInput_1) {
                return true;
            } else {
                console.log('Enter a last name');
                return false;
            }
        }
    },
    {
        type: 'list',
        name: 'role',
        message: 'Select the employee\'s role:',
        choices: await viewAllRoles().then(response => response.map(role => {
            return `${role.id}: ${role.title}`
        }))
    },
    {
        type: 'list',
        name: 'manager',
        message: 'Select the employee\'s manager:',
        choices: await viewAllEmployees().then(response => response.map(manager => {
            return `${manager.id}: ${manager.first_name} ${manager.last_name}`
        }))
    },
]).then(({firstname, lastname, role, manager }) => {
const roleId = parseInt(role.split(':')[0])
const managerId = parseInt(manager.split(':')[0])
const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id ) VALUES (?, ?, ?, ?)`;
const params = [firstname, lastname, roleId, managerId];
    
return new Promise((resolve, reject) => {
    db.query(sql, params, (err, result) => {
    if (err) {
        console.log(`There was a problem adding the role ${err}`)
        reject(err)
    }
    console.log(`${firstname} ${lastname} has been added to the database.`)
        resolve(result)
        })
    })
})
}

//update employee and manager
const updateEmployee = async () => {
    console.log(`Update an Employee`)
    await inquirer.prompt([
    {
        type: 'list',
        name: 'employee',
        message: 'Select the employee\'s you want to update:',
        choices: await viewAllEmployees().then(response => response.map(employee => {
            return `${employee.id}: ${employee.first_name} ${employee.last_name}`
        }))
    },  
    {
        type: 'list',
        name: 'role',
        message: 'Select the employee\'s role:',
        choices: await viewAllRoles().then(response => response.map(role => {
            return `${role.id}: ${role.title}`
        }))
    },
    {
        type: 'list',
        name: 'manager',
        message: 'Select the employee\'s manager:',
        choices: await viewAllEmployees().then(response => response.map(manager => {
            return `${manager.id}: ${manager.first_name} ${manager.last_name}`
        }))
    },
]).then(({employee, role, manager }) => {
const employeeId = parseInt(employee.split(':')[0])
const roleId = parseInt(role.split(':')[0])
const managerId = parseInt(manager.split(':')[0])
const sql = `UPDATE employee SET role_id = ?, manager_id = ? WHERE id = ?`;
const params = [roleId, managerId, employeeId];
    return new Promise((resolve, reject) => {
        db.query(sql, params, (err, result) => {
            if (err) {
                console.log(`There was a problem updating the employee ${err}`)
            reject(err)
        }
            console.log(`Database has been updated.`)
            resolve(result)
        })
    })
})
}
  
module.exports = { viewAllEmployees, addEmployee, updateEmployee }