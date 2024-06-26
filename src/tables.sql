create database db_mecanicos;
use db_mecanicos;
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO users (name, email, password)
VALUES ('Juan Pérez', 'juan@example.com', 'password123');



CREATE TABLE mechanics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(100),
    current_location POINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO mechanics (name, email, password, current_location)
VALUES ('Carlos Martínez', 'carlos@example.com', 'securepassword', ST_GeomFromText('POINT(40.7128 -74.0060)'));


CREATE TABLE services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    mechanic_id INT,
    vehicle_info VARCHAR(255),
    status ENUM('requested', 'in_progress', 'completed'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (mechanic_id) REFERENCES mechanics(id)
);
INSERT INTO services (user_id, mechanic_id, vehicle_info, status)
VALUES (1, 1, 'Toyota Corolla 2020', 'requested');