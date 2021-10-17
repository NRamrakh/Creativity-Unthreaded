const express = require('express');
const controller = require('../controllers/mainController');

const router = express.Router();

router.get('/contact',controller.contact);

router.get('/about',controller.about);

router.get('/home',controller.home);

module.exports=router;