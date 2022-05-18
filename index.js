require('dotenv').config();


const express = require('express');
const controller = require('./controller');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false}));
app.use(express.json());

app.post('/register', controller.handleNewUser);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

module.exports = app;

