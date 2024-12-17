CREATE DATABASE IF NOT EXISTS educat;
USE educat;

CREATE TABLE IF NOT EXISTS modules (
module_id INT AUTO_INCREMENT PRIMARY KEY,
module_name VARCHAR(50),
description VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS questions(
question_id INT AUTO_INCREMENT PRIMARY KEY,
module_id INT NOT NULL,
question_text VARCHAR(255) NOT NULL,
question_type ENUM('multiple_choice','single_choice') NOT NULL,
difficulty ENUM('easy', 'medium', 'hard') DEFAULT 'medium',
FOREIGN KEY (module_id) REFERENCES modules(module_id)
);

CREATE TABLE IF NOT EXISTS answers(
answer_id INT AUTO_INCREMENT PRIMARY KEY,
question_id INT NOT NULL,
answer_text VARCHAR(255) NOT NULL,
is_correct BOOLEAN DEFAULT FALSE,
FOREIGN KEY (question_id) REFERENCES questions(question_id)
);

CREATE TABLE IF NOT EXISTS users (
user_id INT AUTO_INCREMENT PRIMARY KEY,
username VARCHAR(20)
);

CREATE USER IF NOT EXISTS 'educat_app'@'localhost' IDENTIFIED BY 'zxcvbnm'; 
GRANT ALL PRIVILEGES ON educat.* TO 'educat_app'@'localhost';