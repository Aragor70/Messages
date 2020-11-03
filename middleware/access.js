const ErrorResponse = require("../tools/errorResponse")

const access = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorResponse('This content is not authorized.'))
        }
    }
}
module.exports = access;