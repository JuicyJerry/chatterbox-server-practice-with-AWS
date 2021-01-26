DROP DATABASE IF EXISTS chat;
CREATE DATABASE chat;
USE chat;
CREATE TABLE messages (
  id INT NOT NULL AUTO_INCREMENT,
  roomname varchar(255),
  text text(1024),
  userid varchar(255) NOT NULL,
  createdAt datetime DEFAULT CURRENT_TIMESTAMP,
  updatedAt datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);
/* Create other tables and define schemas for them here! */
CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  username varchar(255),
  createdAt datetime DEFAULT CURRENT_TIMESTAMP,
  updatedAt datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);
/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/