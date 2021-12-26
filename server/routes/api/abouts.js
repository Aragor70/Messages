const express = require('express');
const auth = require('../../middleware/auth');
const router = express.Router();

const AboutController = require('../../controllers/AboutController');

const aboutController = new AboutController;


//route GET    api/abouts
//description  get about
//access       private
router.get('/', auth, aboutController.getAbout);


//route GET    api/abouts
//description  get recipient about 
//access       private
router.get('/:id', auth, aboutController.getRecipientAbout);


//route PUT    api/abouts
//description  set up about age, gender, status
//access       private
router.put('/', auth, aboutController.updateDetails);


//route PUT    api/abouts/social
//description  set up about social media
//access       private
router.put('/social', auth, aboutController.updateSocialMedia);


//route DELETE api/abouts/social
//description  delete single social media
//access       private
router.delete('/social/:value', auth, aboutController.deleteSingleSocialMedia);


//route DELETE api/abouts
//description  empty about details
//access       private
router.delete('/', auth, aboutController.deleteAboutDetails);


module.exports = router;