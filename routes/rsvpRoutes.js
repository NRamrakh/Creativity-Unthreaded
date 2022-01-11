const express = require('express');
const controller = require('../controllers/rsvpController');
const {isLoggedIn, isCreator, notHost} = require('../middlewares/auth');
const {validateId, validateRSVP, validateResult} = require('../middlewares/validator');

const router = express.Router();

router.put('/:id',validateId, validateRSVP, validateResult, isLoggedIn,notHost,controller.rsvp);

router.delete('/:id',validateId,isLoggedIn,isCreator,controller.rsvpDelete);



module.exports=router;