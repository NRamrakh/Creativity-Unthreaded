const model = require('../models/event');
const rsvp = require('../models/rsvp');

exports.rsvp=(req,res,next)=>{
    let eventId = req.params.id;
    let userId = req.session.user.id;
    let rsvpResponse = req.body.rsvp.toLowerCase(); 
    rsvp.find({eventId, userId})
        .then(response => {
            if(!response || response.length == 0){
                let data = new rsvp({
                    rsvp: rsvpResponse,
                    userId,
                    eventId
                });
                data.save()
                .then(event => {
                        req.flash('success', 'Your rsvp has been recorded ');
                        res.redirect('/events/' + eventId);
                })
                .catch(err => {
                    if (err.name === 'ValidationError') {
                        req.flash('error', 'There are some Validation error: ' + err.message);
                        res.redirect('back');
                    }
                    else{
                        next(err);
                    }
                })
            } else{
                response[0].rsvp = rsvpResponse;
                rsvp.findByIdAndUpdate(response[0]._id, response[0])
                .then(result=>{
                        if (result) {
                            req.flash('success', 'You have successfully updated your RSVP');
                            res.redirect('/events/' + eventId);
                        } else {
                            let err = new Error("Cannot Find a rsvp data with id: " + eventId);
                            err.status = 404;
                            next(err);
                        }
                    }).catch(err => {
                        if (err.name === 'ValidationError') {
                            req.flash('error', 'There are some Validation error: ' + err.message);
                            res.redirect('back');
                        } else {
                            next(err);
                        }
                    });



            }

        }).catch(err => {
            next(err);
        })
}

exports.rsvpDelete = (req, res, next) => {
    let id = req.params.id;
    rsvp.findByIdAndDelete(id)
        .then(result => {
            if (result) {
                req.flash('success', 'Your RSVP has been deleted');
                res.redirect('/users/profile');
            } else {
                let err = new Error("Cannot find an event with id: " + id);
                err.status = 404;
                next(err);
            }
        }).catch(err => {
            next(err);
        });
}

