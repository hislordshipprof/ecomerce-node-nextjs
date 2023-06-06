const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cookieParser = require('cookie-parser');
const hpp = require('hpp');
const userRouter = require('./dev-data/routes/userRoutes');
const authRouter = require('./dev-data/routes/authRoutes');
const globalErrorHandler = require('./dev-data/controllers/errorControllers');
const AppError = require('./utils/appError');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
//1 . GLOBAL MIDDLEWARES
app.use(express.static(path.join(__dirname, 'public')));

//setting security HTTP headers
app.use(helmet());

//Global middleware for development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
//limiting the number of requests from a single IP address to 100 per hour
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});

app.use('/api', limiter);

//creating own TEST middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});

//3RD PART MIDDLE WARE
//Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());
//Data sanitization against NoSQL query injection
app.use(mongoSanitize());

//Data sanitization against XSS
app.use(xss());

/// ROUTES

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);

//handling unknown url
app.all('*', (req, res, next) => {
  next(new AppError(`Cant find ${req.originalUrl} requested on server!`, 404));
});

//creating a global error handler middleware
app.use(globalErrorHandler);
module.exports = app;
