CREATE DATABASE MKOVENIDB;
use mkovenidb;
GRANT ALL ON MKOVENIDB.* to cool@localhost identified by 'myp6pw';
CREATE TABLE registrations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  account VARCHAR(30) NOT NULL UNIQUE,
  name VARCHAR(50) NOT NULL,
  surname VARCHAR(50) NOT NULL,
  utype VARCHAR(99) NOT NULL,
  email VARCHAR(99) NOT NULL UNIQUE,
  verified DATETIME,
  address VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  created DATETIME,
  updated DATETIME,
  comments TEXT,
  reference VARCHAR(255)
);

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(30) NOT NULL UNIQUE,
  name VARCHAR(99) NOT NULL UNIQUE,
  description TEXT NOT NULL,
  price FLOAT NOT NULL,
  quantity INT NOT NULL,
  created DATETIME,
  updated DATETIME,
  comments TEXT
);

CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ordern VARCHAR(30) NOT NULL UNIQUE,
  account VARCHAR(30) NOT NULL,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(99) NOT NULL,
  address VARCHAR(255) NOT NULL,
  orderdate DATETIME NOT NULL,
  order VARCHAR(99) NOT NULL,
  code VARCHAR(99) NOT NULL,
  price FLOAT NOT NULL,
  comments TEXT,
  done BOOLEAN,
  doneby VARCHAR(99),
  donedate DATETIME,
  reference VARCHAR(255)
);

insert into products (code, name, description, price, quantity, code, created, comments) values("awe201801120001", "awesom3", "awesome3", 56.45, 500, "2018-01-12", "2019-01-12", "Todays Specials.");
insert into products (code, name, description, price, quantity, code, created, comments) values("coo201901120002", "cool3", "cool3", 156.45, 100, "2019-01-12", "2019-01-12", "Half price.");
insert into products (code, name, description, price, quantity, code, created) values("sup201902120003", "super3", "super3", 356.45, 100, "2019-02-12", "2019-02-12");
insert into products (code, name, description, price, quantity, code, created) values("ama201903120004", "amazing3", "amazing3", 29.45, 1200, "2019-03-12", "2019-04-12");
insert into products (code, name, description, price, quantity, code, created) values("swe201903120005", "sweat3", "sweat3", 29.45, 1200, "2019-03-12", "2019-04-12");
select * from products;
show tables;
select * from registrions;
