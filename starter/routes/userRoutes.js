const express = require('express');

const router = express.Router();
const userController = require('../controller/userController');
const authController = require('../controller/authController');
const internshipController = require('../controller/internshipController');

//ALL
router.route('/login').post(authController.login);
router.route('/signUp').post(authController.signup);
router.route('/forgotPassword').post(authController.forgotPassword);
router.route('/resetPassword/:token').patch(authController.resetPassword);
//LoggedIn
router.use(authController.protect);

router
  .route('/me')
  .get(userController.getMe)
  .patch(
    userController.uploadUserPhoto,
    userController.resizeUserPhoto,
    userController.updateMe
  )
  .delete(userController.deleteMe);
//Admin
router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);
router
  .route('/attendance')
  .get(userController.getAllAttendance)
  .post(userController.createAttendance)
  .patch(userController.updateAttendance)
  .delete(userController.deleteAttendance);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
