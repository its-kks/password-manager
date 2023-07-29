const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrpyt = require("bcrypt");
const jwt = require("jsonwebtoken");
//@desc Register a user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("Email and password are mandatory fields");
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User already exists with this email");
    }
    const hashPassword = await bcrpyt.hash(password,10);
    const user = await User.create({
        _id:email,
        email,
        password:hashPassword,
    });
    console.log(`User created with email: ${email}`);
    if(user){
        res.status(201).json({
            _id:user._id,
            email:user.email,
        })
    } 
    else{
        res.status(400);
        throw new Error("Invalid user data");
    }
    res.json({ message: "Registered the user" });
});

//@desc Register a user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error("Email and password are mandatory fields");
    }
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      req.session.masterPassword = password;
      req.session.save();
  
      const accessToken = jwt.sign(
        {
          user: {
            email: user.email,
            id: user._id,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );
      res.json({ accessToken });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
});

//@desc Register a user
//@route GET /api/users/current
//@access private
const getCurrentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});

module.exports = {registerUser,loginUser,getCurrentUser}