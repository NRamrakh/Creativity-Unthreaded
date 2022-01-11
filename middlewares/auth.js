const Event= require('../models/event');
const rsvp = require('../models/rsvp');

//check if user is a guest
exports.isGuest = (req, res, next)=>{
    if(!req.session.user){
        return next();
    } else{
        req.flash('error','You are already logged in');
        return res.redirect('/users/profile');
    }

};

//check if user is authenticated
exports.isLoggedIn = (req, res, next)=>{
    if(req.session.user){
        return next();
    } else{
        req.flash('error','You need to log in first');
        return res.redirect('/users/login');
    }

};

//check if user is host of the event
exports.isHost = (req, res, next)=>{
    let id = req.params.id;
    Event.findById(id)
    .then(event=>{
        if(event){
            if(event.host_name == req.session.user.id){
                return next();
            }else{
                let err = new Error('Unauthorized to access the resource');
                err.status=401;
                return next(err);
            }
        }
        else{
            let err = new Error('Unable to find any record for the id' + id);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err=>next(err))

};

exports.isCreator = (req, res, next) => {
    let id = req.params.id;
    rsvp.findById(id)
        .then((rsvp) => {
            if (rsvp) {
                console.log(rsvp);
                Event.find({_id:rsvp.EventId}).then(result => {
                    if (result) {
                        if (result.createdBy != req.session.user.id) {
                            return next()
                        } else {
                            let err = new Error('You cannot RSVP your own schedule');
                            err.status = 401;
                            return next(err);
                        }
                    } else {
                        let err = new Error('Cannot find any event with the id: ' + id);
                        err.status = 404;
                        return next(err);
                    }
                }).catch(err => next(err));
            } else {
                let err = new Error('Cannot find any RSVP with the id: ' + id);
                err.status = 404;
                return next(err);
            }
        }).catch(err => next(err));
}

exports.notHost = (req, res, next)=>{
    let id = req.params.id;
    Event.findById(id)
    .then(event=>{
        if(event){
            if(event.host_name != req.session.user.id){
                return next();
            }else{
                let err = new Error('Unauthorized to access the resource');
                err.status=401;
                return next(err);
            }
        }
        else{
            let err = new Error('Unable to find any record for the id' + id);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err=>next(err))

};


