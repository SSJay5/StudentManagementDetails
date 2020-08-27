const OnlineCertificate = require('../models/OnlineCertificateModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handelFactory');

exports.setUserIds = (req, res, next) => {
    if (!req.body.user) {
      req.body.user = req.user.id;
    }
    next();
  };
  
  exports.getOnlineCertificate = factory.getOne(OnlineCertificate);
  exports.createOnlineCertificate = factory.createOne(OnlineCertificate);
  exports.deleteOnlineCertificate = factory.deleteOne(OnlineCertificate);
  exports.updateOnlineCertificate = factory.updateOne(OnlineCertificate);
  