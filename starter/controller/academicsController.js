const x = require('../models/AcademicsModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handelFactory');
//const { populate } = require('../models/AcademicsModel');

exports.setUserIds = (req, res, next) => {
  if (!req.body.user) {
    req.body.user = req.user.id;
  }
  next();
};

exports.createAcademics = function(x) {

  catchAsync(async (req, res, next) => {
      
    if(req.user.academics === 'undefined')
    {
      console.log(req.body)
      const doc = await x.Academics.create(req.body)

      res.status(201).json({

          status : 'success',
          data : doc
      })
    }
    else{
      return next (new AppError("No need of creating a new document, please update the existing !",404))
    }
  });

};

exports.deleteAcademics = factory.deleteOne(x.Academics)
exports.updateAcademics = factory.updateOne(x.Academics)

exports.createPointer = factory.createOne(x.Pointer)

exports.getAllPointers = factory.getAll(x.Pointer,{
  path : 'pointers'
});

exports.getAcademics = factory.getAll(x.Academics,{
  path : 'academics' //name given after virtual keyword
})

