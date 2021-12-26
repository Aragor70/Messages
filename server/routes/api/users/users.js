const express = require('express');
const { check } = require('express-validator');
const auth = require('../../../middleware/auth');
const router = express.Router();
const access = require('../../../middleware/access');

const UserController = require('../../../controllers/users/UserController');

const userController = new UserController;

//route POST   api/users
//description  register new user
//access       public
router.post('/', [
    check('name', 'Please enter the name.')
    .isLength({ min: 2, max: 22 })
    .isString(),
    check('email', 'E-mail address is not valid.')
    .isEmail(),
    check('password', 'Please enter the password')
    .isLength({ min: 6 })
], userController.register);


//route PUT    api/users
//description  edit user account
//access       private
router.put('/', [auth, [
    check('password', 'Enter user password.')
    .not()
    .isEmpty(),
    check('new_password', 'Enter valid password.')
    .optional()
    .isString()
    .isLength({ min: 6 }),
    check('email', 'E-mail address is not valid.')
    .optional()
    .isEmail(),
    check('two_factor', 'Contact with the web support.')
    .optional()
    .isBoolean()
    .exists(),
    check('status', 'Please enter valid status.')
    .optional()
    .isString()
]], userController.updateUser);


//route GET    api/users/confirm
//description  confim user password
//access       public
router.post('/confirm', [auth, [
    check('password', 'Confirm your password.')
    .not()
    .isEmpty()
]], userController.confirmPassword);


//route DELETE api/users
//description  delete user account + profile + notification + about
//access       private
router.delete('/', [auth, [
    check('password', 'Enter user password.')
    .not()
    .isEmpty()
]], userController.deleteUserById);


//route DELETE api/users
//description  delete user account + profile + notification + about
//access       private
router.delete('/:id', [auth, [access("Admin", "Service"), [
    check('password', 'Enter user password.')
    .not()
    .isEmpty()
]]], userController.deleteUser);


//route GET    api/users
//description  user route
//access       private
router.get('/', auth, userController.getUser);


module.exports = router;