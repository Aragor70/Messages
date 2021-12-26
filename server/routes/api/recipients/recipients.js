const express = require('express');
const auth = require('../../../middleware/auth');
const router = express.Router();

const RecipientController = require('../../../controllers/recipients/RecipientController');

const recipientController = new RecipientController;


//route GET    api/recipients
//description  get all recipients
//access       private
router.get('/', auth, recipientController.getRecipients);


//route GET    api/recipients
//description  recipient account
//access       private
router.get('/:id', auth, recipientController.getRecipientById);


module.exports = router;