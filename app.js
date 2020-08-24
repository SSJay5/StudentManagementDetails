const path = require('path');
const express = require('express');

const app = express();
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');

const AppError = require('./starter/utils/appError');
const userRouter = require('./starter/routes/userRoutes');
const internshipRouter = require('./starter/routes/internshipRoutes');
const projectRouter = require('./starter/routes/projectRoutes');
const globalErrorHandler = require('./starter/controller/errorController.js');

app.use(helmet());

//Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Limit request from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP ,please try again in an hour!',
});
app.use(express.json({ limit: '10kb' })); //input sey jo json format mey data  leyta hai
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

//Data sanitization against NoSQl query injection
app.use(mongoSanitize());

//Data sanitization against XSS
app.use(xss());

//Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsAverage',
      'ratingsQuality',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);

app.use('/api/v1/users', userRouter);
app.use('/api/v1/internship', internshipRouter);
app.use('/api/v1/project', projectRouter);
app.use('*', (req, res, next) => {
  return next(
    new AppError(`Can't find ${req.originalUrl} on this server!!!`, 404)
  );
});
app.use(globalErrorHandler);
module.exports = app;
