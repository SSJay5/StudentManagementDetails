// eslint-disable-next-line import/no-absolute-path
const AppError = require('../utils/appError');

const handleDuplicateFieldsDB = (err) => {
  const value = err.keyValue.name;
  // console.log(value);
  const message = `Duplicate field value: ${value}.Please use another value!`;
  return new AppError(message, 400);
};

const handleCastErrorDB = (err) => {
  // console.log(err);
  const message = `Invalid ${err.path}:${err.value}.`;
  return new AppError(message, 400);
};

const handleJWTExpiredError = () => {
  return new AppError('Your token has expired! Please login again.', 401);
};

const handleValidationErrorDB = (err) => {
  const er = Object.values(err.errors)
    .map((el) => el.properties.message)
    .join('. ');
  const message = `Invalid input data, ${er}`;

  return new AppError(message, 400);
};

const handleJWTError = () => {
  return new AppError('Invalid token please login again.', 401);
};

//MAin ones
const sendErrorDev = (err, req, res) => {
  // a) API
  console.log(err.message);
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      stack: err.stack,
      error: err,
    });
  }
  //B) RENDERED WEBSITE
  console.log('ERROR', err);
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong',
    message: err.message,
  });
};

const sendErrorProd = (err, req, res) => {
  // A) API
  console.log(err.message);
  if (req.originalUrl.startsWith('/api')) {
    if (err.isOperational) {
      //A) Operational trusted errors send message to client
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }
    //Programming or other unknown errors:don't leak to client
    //1)Log error
    // console.error('Error ', err);
    return res.status(500).json({
      status: 'error',
      message: 'Something went wrong',
    });
  }
  //B) Rendered website
  //A) Operational trusted errors send message to client
  if (err.isOperational) {
    //Operational trusted errors send message to client
    return res.status(err.statusCode).render('error', {
      title: 'Something went wrong!!',
      status: err.status,
      message: err.message,
    });
  }
  //Programming or other unknown errors:don't leak to client
  //1)Log error
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong!!',
    message: 'Please Try again later',
  });
};

module.exports = (err, req, res, next) => {
  //   console.log(err.stack);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  console.log(err.message);
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;
    console.log(err.message);
    console.log(error.message);
    if (err.name === 'CastError') {
      error = handleCastErrorDB(error);
    }
    if (error.code === 11000) {
      error = handleDuplicateFieldsDB(error);
    }
    if (error._message === 'Validation failed') {
      error = handleValidationErrorDB(error);
    }
    if (error.name === 'JsonWebTokenError') {
      error = handleJWTError(error);
    }
    if (error.name === 'TokenExpiredError') {
      error = handleJWTExpiredError(error);
    }
    sendErrorProd(error, req, res);
  }
};
