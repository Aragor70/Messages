const express = require('express');
const auth = require('../../../middleware/auth');
const router = express.Router();

const ChatController = require('../../../controllers/messages/ChatController')

const chatController = new ChatController;

//route GET    api/messengers
//description  get own chats list
//access       private
router.get('/', auth, chatController.getOwnChatList)

//route GET    api/messengers
//description  get single chat with other user
//access       private
router.get('/:id', auth, chatController.getChatById)

//route DELETE api/messengers
//description  delete chat with user id
//access       private
router.get('/:id', auth, chatController.deleteChat)


module.exports = router;