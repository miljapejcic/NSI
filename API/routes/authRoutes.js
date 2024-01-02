const express = require('express');
const router = express.Router();

const { CreateUser, LoginUser, VerifyUser } = require('../controllers/userController');

router.post('/registerUser', CreateUser)
router.post('/loginUser', LoginUser)
router.post('/getUser', VerifyUser)

module.exports = router