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