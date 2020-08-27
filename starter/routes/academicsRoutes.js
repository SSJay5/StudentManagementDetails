const express = require('express');
const academicsController = require('../controller/academicsController');
const authController = require('../controller/authController');

const router = express.Router();

router.use(authController.protect);

router
  .route('/')
  .get(academicsController.getAcademics)
  .post(academicsController.createAcademics);
router.route('/pointer').post(academicsController.createPointer);
router
  .route('/pointer/:id')
  .patch(academicsController.updatePointer)
  .delete(academicsController.deletePointer);
router.route('/:id').patch(academicsController.updateAcademics);

module.exports = router;
