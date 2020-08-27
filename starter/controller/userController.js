const User = require('../models/userModel');
const factory = require('./handelFactory');
const AppError = require('../utils/appError');
const Internship = require('../models/internshipModel');
const Project = require('../models/projectDetailModel');
const catchAsync = require('../utils/catchAsync');
const OnlineCertificate = require('../models/OnlineCertificateModel');

//Student controlls
//InternShip Section
exports.getAllInternships = factory.getAll(Internship, {
  path: 'internships',
});
//Project Section
exports.getAllProjects = factory.getAll(Project, {
  path: 'projects',
});
//Online Certification Section
exports.getAllOnlineCertificates = factory.getAll(OnlineCertificate, {
  path : 'onlineCertificates'
})
//Attendance Section
exports.getAllAttendance = (req, res, next) => {
  res.status(200).json({
    status: 'success',
    data: {
      attendance: req.user.attendance,
    },
  });
};
exports.createAttendance = catchAsync(async (req, res, next) => {
  const { semester, theoryAttendance, praticalAttendance } = req.body;
  if (!semester || !theoryAttendance || !praticalAttendance) {
    return next(
      new AppError(
        'Please Enter the values of semester,Theory Attendance and Pratical Attendance',
        400
      )
    );
  }
  if (req.user.attendance.length + 1 !== semester) {
    if (req.user.attendance.length + 1 > semester) {
      return next(
        new AppError(
          `Data of semester ${semester} is already present please update the data`,
          400
        )
      );
    }
    if (req.user.attendance.length + 1 < semester) {
      return next(
        new AppError(
          `Please enter the data of ${
            req.user.attendance.length + 1
          } before ${semester}`,
          400
        )
      );
    }
  }
  req.user.attendance.push({ semester, theoryAttendance, praticalAttendance });

  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      attendance: req.user.attendance,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});
exports.updateAttendance = catchAsync(async (req, res, next) => {
  let { semester, theoryAttendance, praticalAttendance } = req.body;
  if (!semester) {
    return next(new AppError('Please Enter semester ', 400));
  }
  if (semester >= req.user.attendance.length + 1) {
    return next(
      new AppError(`Please Create ${semester}'s data before updating`, 400)
    );
  }

  if (!theoryAttendance) {
    theoryAttendance = {
      ...req.user.attendance[semester - 1].theoryAttendance,
    };
  }
  if (!praticalAttendance) {
    praticalAttendance = {
      ...req.user.attendance[semester - 1].praticalAttendance,
    };
  }
  req.user.attendance[semester - 1].theoryAttendance = theoryAttendance;
  req.user.attendance[semester - 1].praticalAttendance = praticalAttendance;
  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      attendance: req.user.attendance,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});
exports.deleteAttendance = catchAsync(async (req, res, next) => {
  if (req.user.attendance.length > 0) req.user.attendance.pop();
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      attendance: req.user.attendance,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});
//Admin controlls
exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);
exports.createUser = factory.createOne(User);
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
