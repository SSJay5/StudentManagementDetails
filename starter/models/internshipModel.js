const mongoose = require('mongoose');

const internshipSchema = new mongoose.Schema({
  semester: {
    type: Number,
    min: 1,
    max: 8,
    required: [
      true,
      'Please provide the Semester during which you did your InternShip',
    ],
  },
  companyName: {
    type: String,
    required: [true, 'Please provide the Company name!!!'],
  },
  duration: {
    type: Number,
    required: [true, 'Please Provide duration of internship in months'],
  },
  domain: {
    type: String,
    required: [true, 'Please Provide domian of internship '],
  },
  stipend: {
    type: Number,
    required: [true, 'Please Provide stipend of internship per months'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Internship must belong to a student'],
  },
});

const Internship = new mongoose.model('Internship', internshipSchema);

module.exports = Internship;
