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
    rollNumber : {
      type : String, //TE COMPS A 24
      unique : true,
      required : true
    },
    collegeId: {
      type: String,
      required: [true, 'Please provide your ID card number'],
      unique: true,
    },
    academics: { type: mongoose.Schema.ObjectId },
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
userSchema.virtual('academics',{
  ref: "Academics", //model name where the object will be found (from outside)
  foreignField : 'user', // object name (found in present document)
  localField : '_id' // id 
});

//DOCUMENT MIDDLEWARES
// userSchema.pre('save', async function (next) {
//   if (!this.academics) {
//     return next();
//   }
//   this.academics = await Academics.findById(this.academics);
//   next();
// });
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

userSchema.methods.changedPasswordAfter = function (JWTTimesStamp) {
  // eslint-disable-next-line radix
  const changedTimesStamp = parseInt(this.passwordChangedAt.getTime() / 1000);

  return JWTTimesStamp < changedTimesStamp;
};
const User = mongoose.model('User', userSchema);

module.exports = User;
