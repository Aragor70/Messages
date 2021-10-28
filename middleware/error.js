const ErrorResponse = require("../tools/ErrorResponse");

const errorHandler = (err, req, res, next) => {

    let error = { ...err };

    error.message = err.message

    
    // if unique record exists in db already - duplication 
    if (error.code === 11000) {
        const location = Object.keys(err.keyValue)[0]
        error = new ErrorResponse(`This ${location} already exists.`, 400)
    }

    // case of unhandled validation by express-validator
    if (err.name === "ValidationError") {
        
        const location = Object.values(err.errors).map(value => value.path).join(', ')
        
        error = new ErrorResponse(`Please enter ${location}.`, 400)
    }

    // case of unhandled error
    res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'Server error.'
    })
}
module.exports = errorHandler;