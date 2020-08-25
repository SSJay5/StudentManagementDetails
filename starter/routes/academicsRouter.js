const express = require('express')

const academicsController = require('../controller/academicsController')

const authController = require('../controller/authController');

const router = express.Router();

router.use(authController.protect)

router.use(academicsController.setUserIds)

router
    .route('/pointers')
    .post(academicsController.createPointer)

router
    .route('/')
    .get(academicsController.getAllPointers,academicsController.getAcademics)
    .post(academicsController.createAcademics);

router
    .route('/:id')
    .delete(academicsController.deleteAcademics)
    .patch(academicsController.updateAcademics);



module.exports = router;