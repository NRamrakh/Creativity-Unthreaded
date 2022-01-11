//require modules
const express = require('express');
const morgan = require('morgan');
const eventRoutes = require('./routes/eventRoutes');
const mainRoutes = require('./routes/mainRoutes');
const userRoutes = require('./routes/userRoutes');
const rsvpRoutes = require('./routes/rsvpRoutes');
const methodOverride = require('method-override');
const { MongoClient } = require('mongodb');
const { initCollection } = require('./models/event');
const MongoStore = require('connect-mongo');
var moment = require('moment');
const mongoose = require('mongoose');
const User = require('./models/user');
const session = require('express-session');
const flash = require('connect-flash');


// create app
const app = express();
app.locals.moment = moment;

//configure app
let port = 3000;
let host = 'localhost';
app.set('view engine', 'ejs');

//connect to database

mongoose.connect('mongodb://localhost:27017/demos', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        //start the server
        app.listen(port, host, () => {
            console.log('Server is running on port', port);
        });
    })
    .catch(err => console.log(err.message));


// mount middleware functions
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));
app.use(
    session({
        secret: "ajfeirf90aeu9eroejfoefj",
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({ mongoUrl: 'mongodb://localhost:27017/demos' }),
        cookie: { maxAge: 60 * 60 * 1000 }
    })
);
app.use(flash());

app.use((req, res, next) => {
    //console.log(req.session);
    res.locals.user = req.session.user || null;
    res.locals.errorMessages = req.flash('error');
    res.locals.successMessages = req.flash('success');
    next();
});


//setup routes
app.use('/events', eventRoutes);
app.use('/', mainRoutes);
app.use('/users', userRoutes);
app.use('/rsvp', rsvpRoutes);



app.use((req, res, next) => {
    let err = new Error('This server cannot locate:' + req.url);
    err.status = 404;
    next(err);

});

app.use((err, req, res, next) => {
    console.log(err.stack)
    if (!err.status) {
        err.status = 500;
        err.message = ('Internal server error');
    }
    res.status(err.status)
    res.render('Error', { error: err })
});

