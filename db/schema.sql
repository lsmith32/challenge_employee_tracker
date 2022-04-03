DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS department;

CREATE TABLE department (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);

CREATE TABLE role (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INTEGER,
    CONSTRAINT fk_department_id
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL
);

CREATE TABLE employee (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INTEGER,
    CONSTRAINT fk_role_id
    FOREIGN KEY (role_id)
    REFERENCES role(id)
    ON DELETE SET NULL,
  manager_id INTEGER,
    CONSTRAINT sr_fk_emp_man
    FOREIGN KEY(manager_id)
    REFERENCES employee(id)
);