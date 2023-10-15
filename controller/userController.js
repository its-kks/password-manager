const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrpyt = require("bcrypt");
const jwt = require("jsonwebtoken");
const otpObject = require("../config/OTP").otpObject;

//clean expired OTPs every 10 minutes
setInterval(() => {
  otpObject.cleanExpiredValues();
});

//@desc Register a user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { email, password ,otp} = req.body;
  if (!email || !password || !otp) {
    res.status(400);
    throw new Error("Email ,password and OTP are mandatory fields");
  }
  if(!otpObject.verifyOTP(email,otp)){
    res.status(401);
    throw new Error("Invalid OTP");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already exists with this email");
  }
  const hashPassword = await bcrpyt.hash(password, 10);
  const user = await User.create({
    email,
    password: hashPassword,
  });
  console.log(`User created with email: ${email}`);
  if (user) {
    res.status(201).json({
      _id: user._id,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
  res.json({ message: "Registered the user" });
});

//@desc Login a user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Email and password are mandatory fields");
  }
  const user = await User.findOne({ email });
  console.log(1);
  if (user && (await bcrpyt.compare(password, user.password))) {
    try {
      req.session.masterPassword = password;
      req.session.save();
    } catch (err) {
        res.status(500);
        console.log(err);
        throw new Error("Error in saving session");
    }
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

//@desc Return OTP
//@route POST /api/users/otp
//@access public
const getOTP = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(400);
    throw new Error("Email is a mandatory field");
  }
  const otp = otpObject.generateOTP(email);
  console.log(otp);

  try {
    await sendmail(); // Pass email and otp as arguments
    res.status(201).json({ message: "OTP sent successfully" });
  } catch (error) {
    res.status(400).json({ error: "Error sending OTP email" });
  }
});
module.exports = { registerUser, loginUser, getCurrentUser, getOTP};


async function sendmail(){
  let headersList = {
   "Accept": "*/*",
   "User-Agent": "Thunder Client (https://www.thunderclient.com)",
   "Authorization": `Basic ${process.env.MAIL_KEY}}`,
   "Content-Type": "application/json"
  }
  
  let bodyContent = JSON.stringify({
      "Messages": [
          {
              "From": {
                  "Email": "mernprojectkks@gmail.com",
                  "Name": "test"
              },
              "To": [
                  {
                      "Email": "kkskishlesh3002@gmail.com",
                      "Name": "User"
                  }
              ],
              "Subject": "OTP for password manager",
              "TextPart": "Hello, this is your otp:",
              "HTMLPart": "Hello, this is the HTML part of the email."
          }
      ]
  }
  );
  
  let response = await fetch("https://api.mailjet.com/v3.1/send", { 
    method: "POST",
    body: bodyContent,
    headers: headersList
  });
  
  let data = await response.text();
  console.log(data);
  
}
 