const express = require('express');
const internshipController = require('../controller/internshipController');
const userController = require('../controller/userController');
const authController = require('../controller/authController');

const router = express.Router();

router.use(authController.protect);
router.use(internshipController.setUserIds);
router
  .route('/')
  .get(
    authController.restrictTo('student', 'admin'),
    userController.getAllInternships
  )
  .post(
    authController.restrictTo('student'),
    internshipController.createInternship
  );
router
  .route('/:id')
  .patch(
    authController.restrictTo('student', 'admin'),
    internshipController.updateInternship
  )
  .delete(
    authController.restrictTo('student', 'admin'),
    internshipController.deleteIntership
  );

module.exports = router;
