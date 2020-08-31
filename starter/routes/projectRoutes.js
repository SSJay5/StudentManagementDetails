const express = require('express');
const projectController = require('../controller/projectController');
const authController = require('../controller/authController');
const userController = require('../controller/userController');

const router = express.Router();

//ONLY LOGGEDIN USERS
router.use(authController.protect);
router.use(projectController.setUserIds);

router
  .route('/')
  .get(
    authController.restrictTo('student', 'admin'),
    userController.getAllProjects
  )
  .post(authController.restrictTo('student'), projectController.createProject);

router
  .route('/:id')
  .get(
    authController.restrictTo('student', 'admin'),
    projectController.getProject
  )
  .patch(
    authController.restrictTo('student', 'admin'),
    projectController.updateProject
  )
  .delete(
    authController.restrictTo('student', 'admin'),
    projectController.deleteProject
  );

module.exports = router;
