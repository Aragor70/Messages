const express = require('express');
const auth = require('../../../middleware/auth');
const router = express.Router();

const MessengerController = require('../../../controllers/messages/MessengerController');

const messengerController = new MessengerController;

//route GET    api/messengers
//description  get own messenger
//access       private
router.get('/', auth, messengerController.getOwnMessenger);


//route PUT    api/messengers
//description  edit own messenger
//access       private
router.put('/', auth, messengerController.updateMessenger)


module.exports = router;