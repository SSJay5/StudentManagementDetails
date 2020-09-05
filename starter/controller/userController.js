const multer = require('multer');
const sharp = require('sharp');
const User = require('../models/userModel');
const factory = require('./handelFactory');
const AppError = require('../utils/appError');
const Internship = require('../models/internshipModel');
const Project = require('../models/projectDetailModel');
const ExtraCurricular = require('../models/ExtraCurricularModel')
const catchAsync = require('../utils/catchAsync');
const studentBody = require('../models/studentBodyModel');
const studentProject = require('../models/studentProjectModel');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images', 400), false);
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single('photo');

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) {
    return next();
  }
  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;
  console.log(req.file.filename);
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`${__dirname}/../public/img/users/${req.file.filename}`);
  next();
});

//Student controlls
//InternShip Section
exports.getAllInternships = factory.getAll(Internship, {
  path: 'internships',
});
//Project Section
exports.getAllProjects = factory.getAll(Project, {
  path: 'projects',
});
//Extra Curricular Section
exports.getAllExtraCurriculars = factory.getAll(ExtraCurricular, { 
  path : 'extracurriculars'
})

exports.getAllStudentBodies = factory.getAll(studentBody, {
  path: 'studentBodies',
});
exports.getAllStudentProjects = factory.getAll(studentProject, {
  path: 'studentProjects',
});
exports.getcoCurriculars = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id)
    .populate('studentBodies')
    .populate('studentProjects')
    .populate('studentPublications')
    .select(
      '-role -name -__v -collegeId -email -academics -passwordChangedAt -attendance'
    );

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});
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

// My controlls

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

exports.getMe = (req, res, next) => {
  res.status(200).json({
    status: 'success',
    data: {
      user: req.user,
    },
  });
};
exports.deleteMe = catchAsync(async (req, res, next) => {
  console.log(req.user);
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password update. Please use /updateMyPassword',
        400
      )
    );
  }
  // 2)Fitered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'name', 'email');

  if (req.file) filteredBody.photo = req.file.filename;

  if (req.file) {
    filteredBody.photo = req.file.filename;
  }

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});
