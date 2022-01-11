const express = require('express');
const controller = require('../controllers/userController');
const {isGuest, isLoggedIn} = require('../middlewares/auth');
const { validateSignUp, validateLogin, validateResult } = require('../middlewares/validator');
const { logInLimiter } = require('../middlewares/rateLimiters');


const router = express.Router();

//get the sign up form
router.get('/new',isGuest, controller.new);

router.post('/', isGuest,validateSignUp, validateResult,controller.create);

//GET /users/login: send html for logging in
router.get('/login',isGuest, controller.getUserLogin);

//POST /users/login: authenticate user's login
router.post('/login', isGuest, logInLimiter, validateLogin, validateResult,controller.login);

//GET /users/profile: send user's profile page
router.get('/profile',isLoggedIn, controller.profile);

//POST /users/logout: logout a user
router.get('/logout',isLoggedIn, controller.logout);

module.exports=router;