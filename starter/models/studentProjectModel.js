const mongoose = require('mongoose');

const studentProjectSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    required: [true, 'User Id not set'],
  },
  year: {
    type: Number,
    required: [true, 'Please Provide Current working year of your Project'],
  },
  competitionName: {
    type: String,
    required: [true, 'Please Provide Competetion Name of your Project'],
  },
  projectTitle: {
    type: String,
    required: [true, 'Please Provide Title of your Project'],
  },
  role: {
    type: String,
    required: [true, 'Please Provide Your Role in your Project'],
  },
  position: {
    type: String,
  },
});

const StudentProject = new mongoose.model(
  'StudentProject',
  studentProjectSchema
);

module.exports = StudentProject;
