const express = require('express');
const router = express.Router();
const {getPasswords,createPassword,getPassword,updatePassword,deletePassword,deletePasswords} = require('../controller/passwordController')

const validateTokenHandler = require('../middleware/validateTokenHandler');
router.use(validateTokenHandler);

router.route('/').get(getPasswords);

router.route('/:website').get(getPassword);

router.route('/').post(createPassword);

router.route('/:website/uname/:username').put(updatePassword);

router.route('/:website').delete(deletePasswords);

router.route('/:website/uname/:username').delete(deletePassword);
  
module.exports = router;