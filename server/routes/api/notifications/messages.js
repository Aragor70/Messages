const express = require('express');
const auth = require('../../../middleware/auth');
const router = express.Router();

const MessageController = require('../../../controllers/notifications/MessageController');

const messageController = new MessageController;

//route GET    api/notifications/messages
//description  get list of message notifications
//access       private
router.get('/', auth, messageController.getAboutMessages);

//route GET    api/notifications/messages/:id
//description  get single message notification
//access       private
router.get('/:id', auth, messageController.getAboutMessage);


//route DELETE api/notifications/messages/:id
//description  remove message notification
//access       private
router.delete('/:id', auth, messageController.deleteAboutMessage);


module.exports = router;