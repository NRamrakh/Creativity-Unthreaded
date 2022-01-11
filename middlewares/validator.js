const { body, check, validationResult } = require('express-validator');
const { DateTime } = require("luxon");


exports.validateId = (req, res, next) => {
    let id = req.params.id;
    //an objectId is a 24-bit Hex string
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid story id');
        err.status = 400;
        return next(err);
    } else {
        return next();
    }
}


exports.validateSignUp = [body('firstName', 'First Name cannot be empty').notEmpty().trim().escape(),
body('lastName', 'Last Name cannot be empty').notEmpty().trim().escape(),
body('email', "Email id must be valid Email id address.").isEmail().trim().escape().normalizeEmail(),
body('password', "Password must be atleast 8 charachters and atmost 64 charachters").isLength({ min: 8, max: 64 })];


exports.validateLogin = [body('email', "Email id must be valid Email id address.").isEmail().trim().escape().normalizeEmail(),
body('password', "Password must be atleast 8 charachters and atmost 64 charachters").isLength({ min: 8, max: 64 })];

exports.validateEvent = [body('name', 'Name cannot be empty').notEmpty().trim().escape(),
body('topic', 'Topic cannot be empty').notEmpty().trim().escape(),
//body('host_name', 'Host name cannot be empty').notEmpty().trim().escape(),
body('venue', 'Venue cannot be empty').notEmpty().trim().escape(),
body('start_time', 'Start Time cannot be empty').notEmpty().trim().escape(),
body('end_time', 'End Time cannot be empty').notEmpty().trim().escape(),
body('image', 'Image cannot be empty').notEmpty().trim(),
body('details', "Details must be atleast 10 charachters").isLength({ min: 10 }).trim().escape(),
body('date').trim().isDate().withMessage('Date Field should be of ISO Date format!'),
body('date').trim().isAfter(new Date().toDateString()).withMessage("Event Date should be after Today's date"),
body('start_time', 'Start Time cannot be empty').notEmpty().trim().custom((value, { req }) => {
    let startDate = req.body.start_time;
    let endDate = req.body.end_time;
    let startTimeObj = DateTime.fromFormat(startDate, "hh:mm");
    let endTimeObj = DateTime.fromFormat(endDate, "hh:mm");
    if (!startTimeObj.isValid) {
        throw new Error('Date is not a valid');
    }
    else {
        if (startTimeObj < endTimeObj) {
            console.log('here')
            return true;
        } else {
            throw new Error('Event should end after the start time');
        }
    }
}),

];

exports.validateRSVP = [body('rsvp', "Response field must be valid").trim().notEmpty().isIn(["Yes","No","Maybe","YES","NO","MAYBE","yes","no","maybe"])]

exports.validateResult = (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        errors.array().forEach(err => {
            req.flash('error', err.msg)
        })
        return res.redirect('back');
    } else {
        return next();
    }
}