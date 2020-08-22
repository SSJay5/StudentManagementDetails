const express = require('express');
const internshipController = require('../controller/internshipController');
const userController = require('../controller/userController');
const authController = require('../controller/authController');

const router = express.Router();

router.use(authController.protect);
router.use(internshipController.setUserIds);
router
  .route('/')
  .get(userController.getAllInternships)
  .post(internshipController.createInternship);
router
  .route('/:id')
  .patch(internshipController.updateInternship)
  .delete(internshipController.deleteIntership);

module.exports = router;
