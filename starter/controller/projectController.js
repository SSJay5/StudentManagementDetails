const Project = require('../models/projectDetailModel');
const factory = require('./handelFactory');

exports.setUserIds = (req, res, next) => {
  if (!req.body.user) {
    req.body.user = req.user.id;
  }
  next();
};

exports.getProject = factory.getOne(Project);
exports.createProject = factory.createOne(Project);
exports.updateProject = factory.updateOne(Project);
exports.deleteProject = factory.deleteOne(Project);
