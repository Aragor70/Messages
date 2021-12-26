const express = require('express');
const router = express.Router();
const auth = require('../../../middleware/auth');

const InviteController = require('../../../controllers/notifications/InviteController');

const inviteController = new InviteController;

//route GET    api/notifications/invites
//description  get user invitation list
//access       private
router.get('/', auth, inviteController.getInvites);


//route DELETE api/notifications/invites/:id
//description  remove user invitation notification
//access       private
router.delete('/:id', auth, inviteController.deleteInvite);


module.exports = router;