const express = require('express');
const router = express.Router();
const auth = require('../../../middleware/auth');
const { check } = require('express-validator');
const AuthController = require('../../../controllers/auth/AuthController')

const authController = new AuthController;

//route GET    api/auth
//description  user route
//access       private
router.get('/', auth, authController.getUserById)

//route POST   api/auth
//description  login user
//access       public
router.post('/', [
    check('email', 'E-mail address is not valid.')
    .isEmail(),
    check('password', 'Please enter your password.')
    .not()
    .isEmpty()
], authController.login);

//route GET    api/auth
//description  logout user
//access       private
router.get('/logout', auth, authController.logout)


module.exports = router;