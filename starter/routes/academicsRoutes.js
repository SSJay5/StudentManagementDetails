const express = require('express');
const academicsController = require('../controller/academicsController');
const authController = require('../controller/authController');

const router = express.Router();

router.use(authController.protect);

router
  .route('/')
  .get(
    authController.restrictTo('student', 'admin'),
    academicsController.getAcademics
  )
  .post(
    authController.restrictTo('student'),
    academicsController.createAcademics
  );
router
  .route('/pointer')
  .post(
    authController.restrictTo('student'),
    academicsController.createPointer
  );
router
  .route('/pointer/:id')
  .patch(
    authController.restrictTo('student', 'admin'),
    academicsController.updatePointer
  )
  .delete(
    authController.restrictTo('student', 'admin'),
    academicsController.deletePointer
  );
router
  .route('/:id')
  .patch(
    authController.restrictTo('student', 'admin'),
    academicsController.updateAcademics
  );

module.exports = router;
