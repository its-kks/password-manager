const express = require('express');
const { registerUser,loginUser,getCurrentUser ,getOTP} = require('../controller/userController');

const validateTokenHandler = require('../middleware/validateTokenHandler');
const router = express.Router();

router.post('/register',registerUser);

router.post('/otp',getOTP);

router.post('/login', loginUser);

router.get('/current', validateTokenHandler, getCurrentUser);

module.exports = router;