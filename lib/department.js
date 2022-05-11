const db = require('../db/connection');
const inquirer = require('inquirer');
const { response } = require('express');
const consoleTable = require('console.table');

const viewAllDepartments = () => {
    const sql = `SELECT * from department;`;
    return new Promise((resolve, reject) => {
        db.query(sql, (err, rows) => {
            if (err) {
                console.log('There was an issue getting departments.')
                reject(err)
            }
            resolve(rows)
        });
    })
}

const addDepartment = async () => {
    console.log(`Add department`)
    await inquirer.prompt([{
        type: 'text',
        name: 'name',
        message: 'Enter the department\'s name:',
        validate: nameInput_1 => {
            if (nameInput_1) {
                 return true;
            } else {
                console.log('Enter a department name');
            return false;
        }
    }
},
]).then(({name}) => {
    const sql = `INSERT INTO department (name) VALUES (?)`;
    return new Promise((resolve, reject) => {
    db.query(sql, name, (err, result) => {
        if (err) {
            reject(err)
        }
        resolve(result)
        })
    })
})
}

module.exports = { viewAllDepartments, addDepartment }