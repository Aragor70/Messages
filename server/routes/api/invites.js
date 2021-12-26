const express = require('express');
const auth = require('../../middleware/auth');
const router = express.Router();

const InviteController = require('../../controllers/InviteController');

const inviteController = new InviteController;

//route POST   api/invites/:id
//description  send friend invitation
//access       private
router.post('/:id', auth, inviteController.sendInvite);


//route GET    api/invites
//description  get all invitations
//access       private
router.get('/sent', auth, inviteController.getInvites);


//route GET    api/invites/:id
//description  get single invitation
//access       private
router.get('/:id', auth, inviteController.getInviteById);


//route PUT    api/invites/:id
//description  edit single invitation
//access       private
router.put('/:id', auth, inviteController.updateInvite);


//route DELETE api/invites/:id
//description  remove user invitation
//access       private
router.delete('/:id', auth, inviteController.deleteInvite);


module.exports = router;