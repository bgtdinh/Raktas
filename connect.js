const db = require('./database');
const model = require('./model');

return db.authenticate()
.then( (result) => {
  console.log('postgres connected');
  // return model.sync();

})
// .then( (result) => {
//   console.log('User table created');
//   console.log(result);
//   return result;
// })
.catch( (error) => {
  console.error('Unable to connect to postgres', error);
});


// node
// require('crypto').randomBytes(64).toString('hex')

// create table users (
//   id serial primary key,
//   username varchar(100) not null,
//   password varchar(100) not null
// )