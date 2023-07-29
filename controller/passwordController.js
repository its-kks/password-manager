const Password=require('../models/passwordModel')
const asyncHandler = require('express-async-handler');
const CryptoJS = require('crypto-js');

//@desc Get all contacts
//@route GET /api/contacts
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

//@desc create contact
//@route POST /api/contacts/id
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
      const contact = await Password.create({
        username,
        website,
        password: encryptedPassword,
        user_id: req.user.id,
      });
      res.status(201).json(contact);
    } catch (error) {
      console.log(error);
      res.status(500);
      throw new Error('Error in creating password');
    }
});

//@desc get single contact
//@route GET /api/contacts/id
//@access private
const getPassword = asyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    console.log(contact);
    if(!contact){
        console.log("Not Found")
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
})

//@desc update single contact
//@route PUT /api/contacts/id
//@access private
const updatePassword = asyncHandler(async (req,res)=>{
    //check if contact present
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User can't update contacts of other users");
    }

    const updateContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );
    res.status(200).json(updateContact);
})

//@desc delete single contact
//@route DELETE /api/contacts/id
//@access private
const deletePassword = asyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User can't delete contacts of other users");
    }

    await Contact.deleteOne({_id:req.params.id});
    res.status(200).json(contact);
})

module.exports={getPasswords,createPassword,getPassword,updatePassword,deletePassword};

