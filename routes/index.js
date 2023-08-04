const express = require('express');
const router = express.Router();
const {login} = require('../controller/clientController');

router.get('/', login);

module.exports = router;