const express = require('express');
const auth = require('../../../middleware/auth');
const router = express.Router();

const NotificationController = require('../../../controllers/notifications/NotificationController');

const notificationController = new NotificationController;

//route GET    api/notifications
//description  get own notifications
//access       private
router.get('/', auth, notificationController.getOwnNotifications);


//route PUT    api/notifications
//description  switch on/off notification
//access       private
router.put('/', auth, notificationController.switchOnOff);


//route DELETE api/notifications
//description  delete all notifications
//access       private
router.delete('/', auth, notificationController.deleteAll);


//route GET    api/notifications/feedback
//description  get own feedback messages
//access       private
router.get('/feedback', auth, notificationController.getOwnFeedback);


//route GET    api/notifications/feedback/:id
//description  get single feedback message - optional route
//access       private
router.get('/feedback/:id', auth, notificationController.getFeedbackById);


//route PUT    api/notifications/feedback
//description  switch on/off feedback messages
//access       private
router.put('/feedback', auth, notificationController.switchFeedbackOnOff);


//route DELETE api/notifications/feedback/:id
//description  delete feedback message
//access       private
router.delete('/feedback/:id', auth, notificationController.deleteFeedback);


module.exports = router;