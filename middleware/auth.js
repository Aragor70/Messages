const ErrorResponse = require("../tools/errorResponse");

const jwt = require('jsonwebtoken');
const User = require("../models/User");


const auth = async (req, res, next) => {
    let token;
    
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    else if (req.cookies && req.cookies.token) {
        token = req.cookies.token
    }
    if(!token) {
        return next(new ErrorResponse(`No access permission.`, 401))
    }
        
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decoded.id)
        next()
    } catch (err) {
        next(new ErrorResponse(`User not authorized.`, 401))
    }
    
    
}
module.exports = auth;