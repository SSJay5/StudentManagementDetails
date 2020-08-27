const mongoose = require('mongoose');

const academicsSchema = new mongoose.Schema(
  {
    nameOfSchool: {
      type: String,
      required: [true, 'Please provide name of your school'],
    },
    sscAggregate: {
      type: Number,
      required: [true, 'Please provide your SSC aggregate '],
    },
    nameOfJuniorCollege: {
      type: String,
      required: [true, 'Please provide name of your Junior College'],
    },
    hscAggregate: {
      type: Number,
      required: [true, 'Please provide your HSC/Diploma aggregate '],
    },
    department: {
      type: String,
      required: [
        true,
        'Please provide your Department(CMPN, IT, EXTC, ETRX, AIDS )',
      ],
      enum: ['CMPN', 'IT', 'EXTC', 'ETRX', 'AIDS'],
    },
    domainOfInterest: {
      type: String,
      required: [true, 'Please provide your Domain Of Interest '],
    },
    programmingLanguages: {
      type: String,
      required: [true, 'Please provide your Domain Of Interest '],
    },
    visitedSem: Array,
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
academicsSchema.virtual('cgpi', {
  ref: 'Pointer',
  foreignField: 'academics',
  localField: '_id',
});
// academicsSchema.pre('save', async function (next) {
//   const pointerPromises = this.cgpi.map(async el=>{

//   })
// });
const Academics = new mongoose.model('Academics', academicsSchema);
module.exports = Academics;
