const express = require('express');

const personalDetailsController = require('../controller/personalDetailsController');

const authcontroller = require('../controller/authController');

const router = express.Router();

router.use(authcontrooler.protect);

router
    .route('/')
    .get(
        authcontroller.restrictTo('student','admin'),
        personalDetailsController.getPersonalDetails
    )
    .post(
        authcontroller.restrictTo('student'),
        personalDetailsController.createPersonalDetails
    );

router
    .route('/:id')
    .patch(
        authcontroller.restrictTo('student','admin'),
        personalDetailsController.updatePersonalDetails
    )

module.exports = router