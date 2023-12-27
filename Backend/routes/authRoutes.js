const express = require('express');
const router = express.Router();

const { CreateUser, LoginUser } = require('../controllers/userController');

router.post('/registerUser', CreateUser)
router.post('/loginUser', LoginUser)

module.exports = router