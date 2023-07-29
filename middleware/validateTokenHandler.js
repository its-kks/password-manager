const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const validateTokenHandler = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.status(401);
                next(new Error("Not authorized"));
            } else {
                req.user = decoded.user;
                next(); 
            }
        });
    } else {
        res.status(401);
        next(new Error("No token provided"));
    }
});

module.exports = validateTokenHandler;
