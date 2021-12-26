const express = require('express');
const { check } = require('express-validator');
const router = express.Router();

const TwoFactorController = require('../../../controllers/auth/TwoFactorController');

const twoFactorController = new TwoFactorController;

//route POST   api/auth/two_factor/
//description  post the key from user email address
//access       Public
router.post('/:id', [
    check('key', 'Key is required.')
    .not()
    .isEmpty()
], twoFactorController.confirm);


module.exports = router;
