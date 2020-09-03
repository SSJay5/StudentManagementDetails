const express = require('express');

const extraCurricularController = require('../controller/extraCurricularController');

const userController = require('../controller/userController');

const authController = require('../controller/authController');

const router = express.Router();

router.use(authController.protect);
router.use(extraCurricularController.setUserIds);

router
    .route('/')
    .get(userController.getAllExtraCurriculars)
    .post(extraCurricularController.createExtraCurricular);

router
    .route('/:id')
    .patch(extraCurricularController.updateExtraCurricular)
    .delete(extraCurricularController.deleteExtraCurricular);

module.exports = router