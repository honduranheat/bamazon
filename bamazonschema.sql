DROP DATABASE IF EXISTS bamazondb;
CREATE DATABASE bamazondb;

USE bamazondb;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price INT default 0,
  stock_quantity INT default 0,
  PRIMARY KEY (id)
);


INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Super Nintendo', 'Electronics', 50, 12),
('Gamecube', 'Electronics', 40, 7),
('Atari', 'Electronics', 75, 15),
('Fender Stratocaster', 'Music', 1000, 20),
('Thomas the Train Playset', 'Toys', 99, 15),
('Gundam Wing Set', 'Toys', 24, 12),
('Splash n Slide Fun Time Pool', 'Outdoors', 80, 6);