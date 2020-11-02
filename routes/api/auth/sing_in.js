const sign_in = (user, status, res) => {

    const token = user.getSignedToken()
    
    if ( !token ) {
        return ErrorResponse('Authorization error.', 422)
    }

    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE * 24 * 60 * 60 * 1000), // 30 * 1 day
        httpOnly: true
    }
    if (process.env.NODE_ENV === 'production') {
        options.secure = true;
    }

    res.status(status).cookie('token', token, options).json({ success: true, token })
}
module.exports = sign_in;