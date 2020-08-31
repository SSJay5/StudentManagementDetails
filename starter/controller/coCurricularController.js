const StudentBody = require('../models/studentBodyModel');
const StudentProject = require('../models/studentProjectModel');
const factory = require('./handelFactory');
const User = require('../models/userModel');
const userController = require('../controller/userController');

exports.setUserIds = (req, res, next) => {
  if (!req.body.user) {
    req.body.user = req.user.id;
  }
  next();
};

exports.createStudentBody = factory.createOne(StudentBody);
exports.updateStudentBody = factory.updateOne(StudentBody);
exports.deleteStudentBody = factory.deleteOne(StudentBody);

exports.createStudentProject = factory.createOne(StudentProject);
exports.updateStudentProject = factory.updateOne(StudentProject);
exports.deleteStudentProject = factory.deleteOne(StudentProject);
