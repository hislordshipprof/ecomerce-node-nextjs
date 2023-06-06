const express = require('express');
const {
  updateUser,
  getUserById,
  deleteUser,
  getAllUser,
} = require('../controllers/userControllers');

const router = express.Router();

router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);

router.route('/').get(getAllUser);

module.exports = router;
