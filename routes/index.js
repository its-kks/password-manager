const express = require('express');
const router = express.Router();
const app = express();

const {login,renderData} = require('../controller/clientController');

router.get('/', login);

router.get('/home/user/', renderData);
module.exports = router;