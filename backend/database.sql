CREATE DATABASE csstore;

USE csstore;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(100),
  role ENUM('user','admin') DEFAULT 'user'
);

CREATE TABLE books (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  author VARCHAR(255),
  price DECIMAL(10,2),
  category VARCHAR(100),
  image VARCHAR(255)
);

CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  total DECIMAL(10,2),
  FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT,
  book_id INT,
  quantity INT,
  price DECIMAL(10,2),
  FOREIGN KEY(order_id) REFERENCES orders(id),
  FOREIGN KEY(book_id) REFERENCES books(id)
);

-- Add initial data if needed
INSERT INTO users (name, email, password, role) VALUES
('Admin','admin@example.com','admin123','admin');
