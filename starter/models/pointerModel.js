const mongoose = require('mongoose');

const pointerSchema = new mongoose.Schema({
  semester: {
    type: Number,
    required: [true, 'Please fill your semester details'],
    unique: true,
  },
  gpa: {
    type: Number,
    required: [true, 'Please fill your gpa details'],
  },
  photo: {
    type: String,
    required: [true, 'Please upload your marksheet'],
  },
  academics: {
    type: mongoose.Schema.ObjectId,
    required: [true, 'CGPI must belong to academics'],
  },
});

const Pointer = new mongoose.model('Pointer', pointerSchema);

module.exports = Pointer;
