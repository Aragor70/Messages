const express = require('express');
const { check } = require('express-validator');
const auth = require('../../middleware/auth');
const router = express.Router();

const FriendController = require('../../controllers/FriendController');

const friendController = new FriendController;


//route GET    api/friends
//description  get friendships
//access       private
router.get('/', auth, friendController.getFriendships);


//route GET    api/friends/users
//description  get friends
//access       private
router.get('/users', auth, friendController.getFriends);


//route GET    api/friends/unknowns
//description  get no friends
//access       private
router.get('/unknowns', auth, friendController.getUnknowns);


//route GET    api/friends/:id
//description  get friendship by id
//access       private
router.get('/:id', auth, friendController.getFriendshipById);


//route PUT    api/friends/:id
//description  set type of friendship by id
//access       private
router.put('/:id', [auth, [
    check('type', 'Please enter valid Type.')
    .isString()
]], friendController.updateType);


//route DELETE api/friends/:id
//description  delete friendship
//access       private
router.delete('/:id', auth, friendController.deleteFriendship);


module.exports = router;