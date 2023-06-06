const express = require('express');
const {
  signUp,
  activateAccount,
  login,
  resendActivationToken,
} = require('../controllers/authController');
const upload = require('../../middleware/multer');
const router = express.Router();

router.route('/register').post(upload.single('image'), signUp);
router.route('/login').post(login);
router.route('/accountActivation/:token').get(activateAccount);
router.route('/resendActivationToken').post(resendActivationToken);
module.exports = router;
