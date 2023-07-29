const Password=require('../models/passwordModel')
const asyncHandler = require('express-async-handler');
const CryptoJS = require('crypto-js');

//@desc Get all passwords
//@route GET /api/passwords
//@access private
const getPasswords = asyncHandler(async (req, res) => {
    // Retrieve the master password from the session
    const masterPassword = req.session.masterPassword;
  
    if (!masterPassword) {
      res.status(401);
      throw new Error("Master password not found in the session.");
    }
  
    // Get all passwords for the current user
    const passwords = await Password.find({ user_id: req.user.id });
  
    // Decrypt each password using the master password
    const decryptedPasswords = passwords.map((password) => {
      const bytes = CryptoJS.AES.decrypt(password.password, masterPassword);
      const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
      return {
        username: password.username,
        website: password.website,
        password: originalPassword,
      };
    });
  
    res.status(200).json(decryptedPasswords);
});

//@desc create password
//@route POST /api/passwords/id
//@access private
const createPassword = asyncHandler(async (req, res) => {
    const { username, website, password } = req.body;
    if (!username || !password) {
      res.status(400);
      throw new Error('Username and password are mandatory fields');
    }
  
    const masterPassword = req.session.masterPassword;
    if (!masterPassword) {
      res.status(401);
      throw new Error('Master password not found in the session.');
    }
  
    try {
      const encryptedPassword = CryptoJS.AES.encrypt(password, masterPassword).toString();
      const password = await Password.create({
        username,
        website,
        password: encryptedPassword,
        user_id: req.user.id,
      });
      res.status(201).json(password);
    } catch (error) {
      res.status(500);
      throw new Error('Error in creating password');
    }
});

//@desc get single password
//@route GET /api/passwords/id
//@access private
const getPassword = asyncHandler(async (req,res)=>{
    const password = await Password.findById(req.params.id);
    if(!password){
        res.status(404);
        throw new Error("Password not found");
    }
    res.status(200).json(password);
})

//@desc update single password
//@route PUT /api/passwords/id
//@access private
const updatePassword = asyncHandler(async (req,res)=>{
    //check if password present
    const password = await Password.findById(req.params.id);
    if(!password){
        res.status(404);
        throw new Error("Password not found");
    }

    if(password.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("Passwoed not found");
    }

    const updatePassword = await Password.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );
    res.status(200).json(updatePassword);
})

//@desc delete single password
//@route DELETE /api/passwords/id
//@access private
const deletePassword = asyncHandler(async (req,res)=>{
    const password = await Password.findById(req.params.id);
    if(!password){
        res.status(404);
        throw new Error("Password not found");
    }

    if(password.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("No password found");
    }

    await Password.deleteOne({_id:req.params.id});
    res.status(200).json(password);
})

module.exports={getPasswords,createPassword,getPassword,updatePassword,deletePassword};

