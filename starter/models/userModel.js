const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
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
  collegeId: {
    type: String,
    required: [true, 'Please provide your ID card number'],
    unique: true,
  },
  photo: {
    type: String,
  },
  role: {
    type: String,
    enum: ['admin', 'student', 'proctor', 'teacher'],
    default: 'student',
  },
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
});
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

userSchema.method.changedPasswordAfter = function (JWTTimesStamp) {
  // eslint-disable-next-line radix
  const changedTimesStamp = parseInt(this.passwordChangedAt.getTime() / 1000);

  return JWTTimesStamp < changedTimesStamp;
};
const User = mongoose.model('User', userSchema);

module.exports = User;
