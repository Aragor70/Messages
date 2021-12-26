const express = require('express');
const auth = require('../../../middleware/auth');
const User = require('../../../models/User');
const ErrorResponse = require('../../../tools/ErrorResponse');
const router = express.Router();
const { check } = require('express-validator');

const RolesController = require('../../../controllers/users/RolesController');

const rolesController = new RolesController;

//route PUT    api/users/roles
//description  edit user role
//access       private
router.put('/', [auth, [
    check('role', 'Role not found.')
    .not()
    .isEmpty(),
]], rolesController.updateUserRole);


module.exports = router;