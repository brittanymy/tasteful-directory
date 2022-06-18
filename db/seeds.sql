USE employees_db;

INSERT INTO department (name)
VALUES
("Sales");
("Engineering");
("Finance");

INSERT INTO role (title, salary, department_id)
VALUES
("Sales Lead", 100000, 1),
("Lead Engineer", 150000, 2),
("Accountant", 125000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
("Chris", "Rock", 1, null),
("Will", "Smith", 2, 1),
("G.I", "Jane", 3, null);
