const express = require('express');
const { check } = require('express-validator');
const auth = require('../../middleware/auth');
const router = express.Router();

const ServiceController = require('../../controllers/ServiceController');

const serviceController = new ServiceController;

//route POST   api/services/:id
//description  send service communication to the user
//access       private - service router
router.post('/:id', [auth, [
    check('text', 'Please enter the message.')
    .not()
    .isEmpty()
]], serviceController.sendMessage);


//route GET    api/services/:id
//description  get the single service communication
//access       private
router.get('/:id', auth, serviceController.getMessage);


//route DELETE api/services/:id
//description  remove service message
//access       private
router.delete('/:id', auth, serviceController.deleteMessage);


module.exports = router;