const Internship = require('../models/internshipModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handelFactory');

exports.setUserIds = (req, res, next) => {
  if (!req.body.user) {
    req.body.user = req.user.id;
  }
  next();
};

exports.createInternship = factory.createOne(Internship);
exports.deleteIntership = factory.deleteOne(Internship);
exports.updateInternship = factory.updateOne(Internship);
