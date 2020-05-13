DROP DATABASE IF EXISTS burgersDB;
CREATE DATABASE burgersDB;
USE burgersDB;

CREATE TABLE burgers (
    id INTEGER(11) AUTO_INCREMENT NOT NULL,
    burgerName VARCHAR(50),
    devoured BOOLEAN,
    PRIMARY KEY (id)
);

