const express = require('express');
const { check } = require('express-validator');
const auth = require('../../../middleware/auth');
const router = express.Router();

const MessageController = require('../../../controllers/messages/MessageController');


const messageController = new MessageController;

//route POST   api/messages
//description  send the message and apply for notification
//access       private
router.post('/:id', [auth, [
    check('text', 'Please enter the message.')
    .not()
    .isEmpty()
]], messageController.sendMessage)


//route GET    api/messages/:id
//description  get single message
//access       private
router.get('/:id', auth, messageController.getMessage)

//route GET    api/messages/:id
//description  get messages with user by id
//access       private
/* router.get('/:id', auth, asyncHandler( async(req, res, next) => {
    
    const messages = await Message.find({ "users":{ _id: req.user.id, _id: req.params.id } }).populate('user = recipient', ['name', 'avatar'])
    if (!messages) {
        return next(new ErrorResponse('Messages not found.', 404))
    }


    res.json( messages )
})); */

//route PUT    api/messages/:id
//description  edit single communication
//access       private
router.put('/:id', auth, messageController.updateMessage);

//route DELETE api/messages/:id
//description  delete single message
//access       private
router.delete('/:id', auth, messageController.deleteMessage);


module.exports = router;