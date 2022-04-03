INSERT INTO department
(name)
VALUES
  ('Sales'),
  ('Engineering'),
  ('Finance'),
  ('Legal');

INSERT INTO role
(title, salary, department_id)
VALUES
  ('Salesperson', 255000, 1),
  ('Lead Engineer', 160000, 1),
  ('Sofware Engineer', 140000, 1),
  ('Account Manager', 120000, 1),
  ('Accountant', 65000, 2),
  ('Legal Team Lead', 60000, 3),
  ('Lawyer', 120000, 4);

INSERT INTO employee
(first_name, last_name, role_id, manager_id)
VALUES
  ('Mike', 'Chan', 1, NULL),
  ('Ashley', 'Rodriguez', 2, 1),
  ('Kevin', 'Tupik', 2, 1),
  ('Kunal', 'Singh', 3, 3),
  ('Malia', 'Brown', 3, 2),
  ('Sarah', 'Lourd', 4, 2),
  ('Tom', 'Allen', 4, 3);