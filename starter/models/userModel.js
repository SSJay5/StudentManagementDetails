const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const Academics = require('./academicsModel');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please tell us your name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please tell use your email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Plase enter a valid email'],
    },
    photo: {
      type: String,
      default: 'default.jpeg',
    },
    collegeId: {
      type: String,
      required: [true, 'Please provide your ID card number'],
      unique: true,
    },
    personalDetails : {type : mongoose.Schema.Types.ObjectId},
    academics: { type: mongoose.Schema.Types.ObjectId },
    photo: {
      type: String,
    },
    role: {
      type: String,
      enum: ['admin', 'student', 'proctor', 'teacher'],
      default: 'student',
    },
    attendance: [
      {
        semester: {
          type: Number,
        },
        theoryAttendance: {
          type: Number,
        },
        praticalAttendance: {
          type: Number,
        },
      },
    ],
    password: {
      type: String,
      required: [true, 'Please provide your password '],
      minlength: 8,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your Password'],
      validate: {
        validator: function (el) {
          return this.password === el;
        },
        message: 'Passwords are not Same',
      },
      select: false,
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
//VIRTUAL FIELDS
userSchema.virtual('internships', {
  ref: 'Internship',
  foreignField: 'user',
  localField: '_id',
});
userSchema.virtual('projects', {
  ref: 'Project',
  foreignField: 'user',
  localField: '_id',
});
userSchema.virtual('onlineCertificates',{
  ref : 'OnlineCertificate',
  foreignField : 'user',
  localField : '_id'
});
userSchema.virtual('extraCurriculars', {
  ref : 'ExtraCurricular' ,
  foreignField : 'user' ,
  localField : '_id' 
})
userSchema.virtual('studentBodies', {
  ref: 'StudentBody',
  foreignField: 'user',
  localField: '_id',
});
userSchema.virtual('studentProjects', {
  ref: 'StudentProject',
  foreignField: 'user',
  localField: '_id',
});
userSchema.virtual('studentPublications',{
  ref : 'StudentPublication',
  foreignField : 'user',
  localField : '_id'
});

//DOCUMENT MIDDLEWARES
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});
userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) {
    return next();
  }
  this.passwordChangedAt = Date.now() - 1000;

  next();
});

//QUERY MIDDLEWARES
userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  //console.log({ resetToken }, this.passwordResetToken);

  return resetToken;
};
userSchema.methods.changedPasswordAfter = function (JWTTimesStamp) {
  // eslint-disable-next-line radix
  const changedTimesStamp = parseInt(this.passwordChangedAt.getTime() / 1000);

  return JWTTimesStamp < changedTimesStamp;
};
const User = mongoose.model('User', userSchema);

module.exports = User;
