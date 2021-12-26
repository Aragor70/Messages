const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const Reset_PasswordController = require('../../../controllers/auth/Reset_PasswordController');

const reset_PasswordController = new Reset_PasswordController;


//route POST   api/users/password
//description  reset user password and send the email
//access       Public
router.post('/', [
    check('email', 'E-mail address is not valid.')
    .isEmail()
], reset_PasswordController.resetPassword)


//route POST   api/users/password
//description  get reset token and set up the new password
//access       Public
router.post('/:resettoken', [
    check('password', 'Please enter valid password.')
    .isLength({ min: 6 })
], reset_PasswordController.updatePassword)

