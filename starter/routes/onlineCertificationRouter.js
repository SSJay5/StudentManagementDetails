const express = require('express');
const onlineCertificateController = require('../controller/onlineCertificationController');
const userController = require('../controller/userController');
const authController = require('../controller/authController');

const router = express.Router();

router.use(authController.protect);
router.use(onlineCertificateController.setUserIds);

router
    .route('/')
    .get(
        authController.restrictTo('student', 'admin'),    
        userController.getAllOnlineCertificates)

    .post(
        authController.restrictTo('student'),
        onlineCertificateController.createOnlineCertificate);

router
    .route('/:id')
    .patch(
        authController.restrictTo('student', 'admin'),
        onlineCertificateController.updateOnlineCertificate)

    .delete(
        authController.restrictTo('student', 'admin'),
        onlineCertificateController.deleteOnlineCertificate)


module.exports = router