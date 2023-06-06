const { promisify } = require('util');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../../models/userModel');
const catchAysnc = require('../../utils/catchAysnc');
const AppError = require('../../utils/appError');
const sendEmail = require('../../utils/email');
const cloudinary = require('../../utils/cloudinary');
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = async (user, statusCode, res, req, type) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  res.cookie('jwt', token, cookieOptions);
  // console.log('----cookies', res.cookie('jwt', token, cookieOptions));
  user.password = undefined;

  if (type === 'login') {
    // Response for login
    res.status(statusCode).json({
      status: 'success',
      message: 'Successfully logged in!',
      token,
      data: {
        user,
      },
    });
  } else if (type === 'signup') {
    // Response for signup
    if (!req.protocol) {
      return next(new AppError('There is no user with email address.', 404));
    }

    const activationURL = `${req.protocol}://${req.get(
      'host'
    )}/api/v1/auth/accountActivation/${token}`;
    try {
      const buttonHtml = `<button onclick="window.open('${activationURL}', '_blank', 'noopener')">Activate Account</button>`;
      const message = `Hello ${user.name}, please click on the button to activate your account: <br>${buttonHtml}`;
      const html = `Hello ${user.name},<br><br>Please click on the button below to activate your account:<br><br>${buttonHtml}`;

      await sendEmail({
        email: user.email,
        subject: 'Activate your account',
        message: message,
        html: html,
      });

      res.status(statusCode).json({
        status: 'success',
        message: `Please check your email: ${user.email} to activate your account!`,
        token,
        data: {
          user,
        },
      });
    } catch (error) {
      return next(new AppError('Something went wrong', 500));
    }
  }
};

exports.signUp = catchAysnc(async (req, res, next) => {
  const files = req.file.path;

  const result = await cloudinary.uploader.upload(files, {
    folder: 'Ecommerce',
  });
  if (!result) return next(new AppError('please upload image', 404), false);

  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    image: result.secure_url,
  });

  createSendToken(newUser, 201, res, req, 'signup');
});

exports.activateAccount = catchAysnc(async (req, res, next) => {
  const { token } = req.params;
  console.log('----', req.params);
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        return next(new AppError('Incorrect or Expired link', 400));
      }
      console.log('---decodedToken', decodedToken);
      const { id } = decodedToken;
      const user = await User.findById(id);
      if (!user) {
        return next(new AppError('User not found', 400));
      }
      if (user.active) {
        return next(new AppError('User account is already activated', 400));
      }
      user.active = true;
      await user.save({ validateBeforeSave: false });

      res.status(200).json({
        status: 'success',
        message: 'Account activated successfully',
      });
    });
  } else {
    return next(new AppError('Something went wrong', 400));
  }
});

exports.resendActivationToken = catchAysnc(async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(new AppError('Please provide an email address', 400));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  if (user.active) {
    return next(new AppError('User is already activated', 400));
  }

  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  res.cookie('jwt', token, cookieOptions);

  if (!req.protocol) {
    return next(new AppError('There is no user with email address.', 404));
  }

  const activationURL = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/auth/accountActivation/${token}`;

  try {
    const buttonHtml = `<button onclick="window.open('${activationURL}', '_blank', 'noopener')">Activate Account</button>`;
    const message = `Hello ${user.name}, please click on the button to activate your account: <br>${buttonHtml}`;
    const html = `Hello ${user.name},<br><br>Please click on the button below to activate your account:<br><br>${buttonHtml}`;

    await sendEmail({
      email: user.email,
      subject: 'Activate your account',
      message: message,
      html: html,
    });

    res.status(200).json({
      status: 'success',
      message: `Activation token has been sent to ${user.email}`,
    });
  } catch (error) {
    return next(new AppError('Something went wrong', 500));
  }
});

exports.login = catchAysnc(async (req, res, next) => {
  const { email, password } = req.body;
  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }
  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email }).select('+password +active');
  console.log(user.active);
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }
  // 3) Check if user has activated their account
  if (!user.active) {
    return next(new AppError('Account not activated please activate it', 401));
  }
  //3) if everything ok, send token to client
  createSendToken(user, 200, res, req, 'login');
});

exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      // 1) verify token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      // 2) Check if user still exists
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next();
      }

      // 3) Check if user changed password after the token was issued
      if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next();
      }

      // THERE IS A LOGGED IN USER
      res.locals.user = currentUser;
      return next();
    } catch (err) {
      return next();
    }
  }
  next();
};

exports.forgotPassword = catchAysnc(async (req, res, next) => {
  // 1) Get user based on POSTed email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('There is no user with email address.', 404));
  }

  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3) Send it to user's email
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/resetPassword/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;
  console.log('here is user', user.email);
  console.log('RESET is user', resetURL);

  try {
    const value = await sendEmail({
      email: user.email,
      subject: 'Your password reset token (valid for 10 min)',
      message,
    });
    console.log('--here is value', value);
    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpire = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError('There was an error sending the email. Try again later!'),
      500
    );
  }
});

exports.resetPassword = catchAysnc(async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');
  console.log('---hased', hashedToken);
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    // passwordResetExpire: { $gt: Date.now() },
  });

  console.log('--user', user);
  // 2) If token has not expired, and there is user, set the new password
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpire = undefined;
  await user.save();

  // 3) Update changedPasswordAt property for the user
  // 4) Log the user in, send JWT
  createSendToken(user, 200, res);
});

exports.updatePassword = catchAysnc(async (req, res, next) => {
  // 1) Get user from collection
  const user = await User.findById(req.user.id).select('+password');

  // 2) Check if POSTed current password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError('Your current password is wrong.', 401));
  }

  // 3) If so, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  // User.findByIdAndUpdate will NOT work as intended!

  // 4) Log user in, send JWT
  createSendToken(user, 200, res);
});
