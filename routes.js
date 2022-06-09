const express = require('express');
const router = express.Router();
const controller = require('./controller');
const employeeController = require('./employeeController');
const refreshController = require('./refreshController');
const verifyJWT = require('./middleware');

router.route('/refresh')
  .get(refreshController.handleRefreshToken);

router.route('/employees')
  .get(verifyJWT, employeeController.getAllEmployees)
  .post(verifyJWT, employeeController.addEmployee)
//   .put()
//   .delete()

router.route('/employees/:id')
  .get(verifyJWT, employeeController.getEmployeeById)
  .put(verifyJWT, employeeController.editEmployee)
  .delete(verifyJWT, employeeController.deleteEmployee)

router.route('/register')
  .post(controller.handleNewUser)

router.route('/login')
  .post(controller.handleLogin)

module.exports = router;