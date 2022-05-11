const db = require('../db/connection');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const { viewAllDepartments } = require('./department');

// Get all roles
const viewAllRoles = () => {
const sql = `select role.*, department.name AS department_name from role LEFT JOIN department ON department_id = department.id;`;
  return new Promise((resolve, reject) => {
  db.query(sql, (err, rows) => {
        if (err) {
        reject(err)
    }
        resolve(rows);
    });
  })
}

//Prompts for db 
const addRole = async () => {
console.log(`Add a Role`)
    await inquirer.prompt([{
        type: 'text',
        name: 'name',
        message: 'Enter the Role\'s name:',
        validate: nameInput_1 => {
            if (nameInput_1) {
                return true;
            } else {
                console.log('Enter a role name');
                return false;
            }
        }
    },
    {
        type: 'text',
        name: 'salary',
        message: 'Enter the salary:',
        validate: nameInput_1 => {
            if (nameInput_1) {
                return true;
            } else {
                console.log('Enter a salary');
                return false;
            }
        }
    },
    {
        type: 'list',
        name: 'type',
        message: 'Select the department this role will be part of:',
        choices: await viewAllDepartments().then(response => response.map(dept => {
            return `${dept.id}:${dept.name}`
        }))
    }, 
]).then(({name, salary, type }) => {
const deptID = parseInt(type.split(':')[0])
const sql = `INSERT INTO role (title, salary, department_id ) VALUES (?, ?, ?)`;
const params = [name, salary, deptID];
    return new Promise((resolve, reject) => {
    db.query(sql, params, (err, result) => {
        if (err) {
            console.log(`There was a problem adding the role ${err}`)
            reject(err)
        }
        resolve(result)
        })
    })
})
}

module.exports = { viewAllRoles, addRole } 