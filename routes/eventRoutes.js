const express = require('express');
const controller = require('../controllers/eventController');
const {isLoggedIn, isHost} = require('../middlewares/auth');
const {validateId,validateEvent, validateRSVP, validateResult} = require('../middlewares/validator');

const router = express.Router();

router.get('/',controller.index);

router.get('/new',isLoggedIn,controller.new);

router.post('/',isLoggedIn,validateEvent, validateResult,controller.create);

router.get('/:id',validateId,controller.show);

router.get('/:id/edit',validateId,isLoggedIn,isHost,controller.edit);

router.put('/:id', validateId, isLoggedIn, isHost, validateEvent, validateResult,controller.update);

router.delete('/:id',validateId,isLoggedIn,isHost,controller.delete);





module.exports=router;