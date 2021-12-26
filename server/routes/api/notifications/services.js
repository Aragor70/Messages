const express = require('express');
const auth = require('../../../middleware/auth');
const router = express.Router();

const ServiceController = require('../../../controllers/notifications/ServiceController');

const serviceController = new ServiceController;

//route GET    api/notifications/services
//description  get user all service notifications
//access       private
router.get('/', auth, serviceController.getServiceNotifications);


//route PUT    api/notifications/services/:id
//description  edit single service message communication
//access       private
router.put('/:id', auth, serviceController.getServiceNotificationById);


//route DELETE api/notifications/services/:id
//description  remove service notification
//access       private
router.delete('/:id', auth, serviceController.deleteServiceNotification);


module.exports = router;