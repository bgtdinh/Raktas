const express = require('express');
const router = express.Router();
const controller = require('./controller');
const employeeController = require('./employeeController');
const verifyJWT = require('./middleware');


router.route('/employees')
  .get(employeeController.getAllEmployees)
  .post(employeeController.addEmployee)
//   .put()
//   .delete()

// router.route('/employees/:id')
//   .get()

router.route('/register')
  .post(controller.handleNewUser)

router.route('/login')
  .post(controller.handleLogin)

module.exports = router;