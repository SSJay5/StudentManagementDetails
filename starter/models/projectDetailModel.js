const mongoose = require('mongoose');

const projectDetailSchema = new mongoose.Schema({
  semester: {
    type: Number,
    min: 1,
    max: 8,
    required: [
      true,
      'Please provide the Semester during which you did your Project',
    ],
  },
  title: {
    type: String,
    required: [true, 'Please provide title of your Project'],
  },
  from: {
    type: Date,
    required: [true, 'Please provide Starting Date of your Project'],
  },
  to: {
    type: Date,
    required: [true, 'Please provide Ending Date of your Project'],
  },
  role: {
    type: String,
    required: [true, 'Please provide your role in your Project'],
  },
  mentor: {
    type: String,
  },
  funded: {
    type: Boolean,
    required: [true, 'Was your internship funded'],
  },
  investor: {
    type: String,
    default: null,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Project must belong to a student'],
  },
  skillsDeveloped: {
    type: String,
    required: [true, 'Please Fill Skills You Developed during your internship'],
  },
});

// eslint-disable-next-line new-cap
const Project = new mongoose.model('Project', projectDetailSchema);

module.exports = Project;
