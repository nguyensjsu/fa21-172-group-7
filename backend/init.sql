-- Creates the new database
create database cmpe172;
-- Creates the user
create user 'admin'@'%' identified by 'welcome';
-- Gives all privileges to the new user on the newly created database
grant all on cmpe172.* to 'admin'@'%'; 