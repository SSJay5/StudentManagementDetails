const express = require('express');
const onlineCertificateController = require('../controller/onlineCertificationController');
const userController = require('../controller/userController');
const authController = require('../controller/authController');

const router = express.Router();

router.use(authController.protect);
router.use(onlineCertificateController.setUserIds);

router
    .route('/')
    .get(userController.getAllOnlineCertificates)
    .post(onlineCertificateController.createOnlineCertificate);

router
    .route('/:id')
    .patch(onlineCertificateController.updateOnlineCertificate)
    .delete(onlineCertificateController.deleteOnlineCertificate)


module.exports = router