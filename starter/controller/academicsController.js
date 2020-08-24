const Academics = require('../models/AcademicsModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handelFactory');

exports.setUserIds = (req, res, next) => {
  if (!req.body.user) {
    req.body.user = req.user.id;
  }
  next();
};

exports.createAcademics = (Academics) => {

  catchAsync(async (req, res, next) => {
      
    if(req.user.academics === 'undefined')
    {
      const doc = await Academics.create(req.body)
      res.status(201).json({

          status : 'success',
          data : doc
      })
    }
    else{
      return next (new AppError("No need of creating a new document, please update the existing !",404))
    }
  })

}
exports.deleteAcademics = factory.deleteOne(Academics);
exports.updateAcademics = factory.updateOne(Academics);
exports.getAcademics = factory.getAll(Academics);