const Academics = require('../models/academicsModel');
const User = require('../models/userModel');
const factory = require('./handelFactory');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Pointer = require('../models/pointerModel');
const { bool } = require('sharp');
const { findById } = require('../models/userModel');

exports.getAcademics = catchAsync(async (req, res, next) => {
  let myAcademics;
  if (req.user.academics) {
    myAcademics = await Academics.findById(req.user.academics).populate({
      path: 'cgpi',
    });
  }
  res.status(200).json({
    status: 'success',
    data: myAcademics,
  });
});
exports.createAcademics = catchAsync(async (req, res, next) => {
  if (req.user.academics) {
    return next(new AppError('Please Update/Fill Existing Document', 400));
  }
  const academics = await Academics.create(req.body);
  req.user.academics = academics._id;
  await User.findByIdAndUpdate(
    req.user.id,
    {
      academics: req.user.academics,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(201).json({
    status: 'success',
    data: {
      academics,
    },
  });
});
exports.updateAcademics = factory.updateOne(Academics);

exports.createPointer = catchAsync(async (req, res, next) => {
  req.body.academics = req.user.academics;
  const currAcademics = await Academics.findById(req.user.academics);
  if (!currAcademics) {
    return next(
      new AppError(
        'An unexpexted Error occured !!!.If This continues please save the remaining data and try again ',
        405
      )
    );
  }
  let ok = true;
  if (currAcademics.visitedSem[req.body.semester]) {
    return next(new AppError('Please Update/Fill existing data!!!', 400));
  }
  currAcademics.visitedSem[req.body.semester] = 1;
  const updatedAcademics = await Academics.findByIdAndUpdate(
    req.user.academics,
    currAcademics,
    {
      runValidators: true,
    }
  );
  const pointer = await Pointer.create(req.body);

  res.status(200).json({
    status: 'success',
    data: pointer,
  });
});

exports.updatePointer = factory.updateOne(Pointer);
exports.deletePointer = catchAsync(async (req, res, next) => {
  const currAcademics = await Academics.findById(req.user.academics);
  if (!currAcademics) {
    return next(
      new AppError(
        'An unexpected Error occured !!!.If This continues please save the remaining data and try again ',
        405
      )
    );
  }
  const currPointer = await Pointer.findById(req.params.id);
  currAcademics.visitedSem[currPointer.semester] = null;
  const updatedAcademics = await Academics.findByIdAndUpdate(
    req.user.academics,
    currAcademics,
    {
      runValidators: true,
    }
  );
  await Pointer.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
