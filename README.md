# node-authentication-backend

node
require('crypto').randomBytes(64).toString('hex')

create table users (
  id serial primary key,
  username varchar(100) not null,
  password varchar(100) not null
)