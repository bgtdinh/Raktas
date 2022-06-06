require('dotenv').config();


const express = require('express');
require('./connect');
// const controller = require('./controller');
// const user = require('./model');
// const verifyJWT = require('./middleware');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false}));
app.use(express.json());

// app.get('/protected', verifyJWT, controller.protectedRoute);
// app.post('/register', controller.handleNewUser);
// app.post('/login', controller.handleLogin);
app.use('/', require('./routes'));

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

module.exports = app;

