const express = require('express');
const router = express.Router();
const {getPasswords,createPassword,getPassword,updatePassword,deletePassword} = require('../controller/passwordController')

const validateTokenHandler = require('../middleware/validateTokenHandler');
router.use(validateTokenHandler);

router.route('/').get(getPasswords);

router.route('/:id').get(getPassword);

router.route('/').post(createPassword);

router.route('/:id').put(updatePassword);

router.route('/:id').delete(deletePassword);
  
module.exports = router;