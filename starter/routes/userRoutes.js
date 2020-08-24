const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const authController = require('../controller/authController');
const internshipController = require('../controller/internshipController');
const { use } = require('../../app');

//ALL
router.route('/login').post(authController.login);
router.route('/signUp').post(authController.signup);

//LoggedIn
router.use(authController.protect);
//Admin
router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);
router
  .route('/attendance')
  .get(userController.getAllAttendance)
  .post(userController.createAttendance);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
