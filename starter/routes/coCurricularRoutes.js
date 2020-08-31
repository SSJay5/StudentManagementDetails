const express = require('express');
const coCurricularController = require('../controller/coCurricularController');
const authController = require('../controller/authController');
const userController = require('../controller/userController');

const router = express.Router();

router.use(authController.protect);
router.use(coCurricularController.setUserIds);

router
  .route('/')
  .get(
    authController.restrictTo('student', 'admin'),
    userController.getcoCurriculars
  );
router
  .route('/studentBody')
  .post(
    authController.restrictTo('student'),
    coCurricularController.createStudentBody
  );
router
  .route('/studentBody/:id')
  .patch(
    authController.restrictTo('student', 'admin'),
    coCurricularController.updateStudentBody
  )
  .delete(
    authController.restrictTo('student', 'admin'),
    coCurricularController.deleteStudentBody
  );

router
  .route('/studentProject')
  .post(
    authController.restrictTo('student'),
    coCurricularController.createStudentProject
  );
router
  .route('/studentProject/:id')
  .patch(
    authController.restrictTo('student', 'admin'),
    coCurricularController.updateStudentProject
  )
  .delete(
    authController.restrictTo('student', 'admin'),
    coCurricularController.deleteStudentProject
  );
module.exports = router;
