drop database if exists schat;

create database schat;
use schat;

create table messages (
  msg_id int not null auto_increment,
  user varchar(25),
  msg_text varchar(500),
  time datetime,
  room varchar(25),
  primary key( msg_id )
);

create table users (
  user_id int not null auto_increment,
  username varchar(25),
  primary key( user_id )
);

create table rooms (
  room_id int not null auto_increment,
  roomname varchar(25),
  primary key( room_id )
);

/*  execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

