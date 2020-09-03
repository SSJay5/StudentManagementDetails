const ExtraCurricular = require('../models/ExtraCurricularModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handelFactory');

exports.setUserIds = (req ,res, next) => {
    if(!req.body.user){
        req.body.user = req.user.id;
    }
    next();
}

exports.getExtraCurricular = factory.getOne(ExtraCurricular);
exports.createExtraCurricular = factory.createOne(ExtraCurricular);
exports.deleteExtraCurricular = factory.deleteOne(ExtraCurricular);
exports.updateExtraCurricular = factory.updateOne(ExtraCurricular);
