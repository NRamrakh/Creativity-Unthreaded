const model = require('../models/event');
const rsvp = require('../models/rsvp');

exports.index = (req, res, next) => {
    let data =[];
    model.find()
        .then(events => {
            if (events.length) {
                events.forEach(event => {

                    let value = event.topic;

                    if (data.length == 0) {
                        let object = {};
                        object[value] = [event];
                        data.push(object);
                    } else {
                        let index = -1
                        data.map((x, i) => {
                            if (Object.keys(x)[0] == value) {
                                if (index == -1) {
                                    index = i;
                                }
                            }

                        });

                        if (index != -1) {

                            data[index][value].push(event)
                        } else {
                            let object = {};
                            object[value] = [event];
                            data.push(object);

                        }


                    }

                });

            }
            res.render('./events/index', {data})
        })
        .catch(err => next(err));
};


exports.new = (req, res) => {
    res.render('./events/new')
};


exports.create = (req, res, next) => {
    let event = new model(req.body)
    event.host_name = req.session.user.id;
    event.save()
        .then(event => {
            req.flash('success', 'You have created the event successfully ');
            res.redirect('/events')})
        .catch(err => {
            if (err.name === 'ValidationError') {
                req.flash('error', 'There are some Validation error: ' + err.message);
                res.redirect('back');
            }
            else{
                next(err);
            }
            
        });
};


exports.show = (req, res, next) => {
    let id = req.params.id;

    model.findById(id).populate('host_name', 'firstName lastName')
        .then(event => {
            if (event) {
                rsvp.find({eventId: id, rsvp:"yes"})
                .then(data=>{
                    let rsvpCount = data.length;

                    return res.render('./events/show', { event, rsvpCount });
                }) 
                .catch(err => next(err));
            } else {
                let err = new Error("Cannot find an event with id: " + id);
                err.status = 404;
                next(err);

            }
        })
        .catch(err => next(err));

};

exports.edit = (req, res, next) => {
    let id = req.params.id;

    model.findById(id)
        .then(event => {
            if (event) {
                return res.render('./events/edit', { event })
            } else {
                let err = new Error("Cannot find an event with id: " + id);
                err.status = 404;
                next(err);

            }
        })
        .catch(err => next(err));

};


exports.update = (req, res, next) => {
    let event = req.body;
    let id = req.params.id;
    model.findByIdAndUpdate(id, event, { useFindAndModify: false, runValidators: true })
        .then(event => {
            if (event) {
                req.flash('success', 'You have updated the event successfully ');
                res.redirect('/events/' + id);
            } else {
                let err = new Error("Cannot find an event with id: " + id);
                err.status = 404;
                next(err);

            }
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


};

exports.delete = (req, res, next) => {
    let id = req.params.id;

    model.findByIdAndDelete(id, { useFindAndModify: false })
        .then(event => {
            if (event) {
                rsvp.deleteMany({eventId: id})
                .then(result =>{
                    if(result){
                        req.flash('success', 'You have deleted the event successfully ');
                        res.redirect('/events');
                    } else {
                        let err = new Error("Cannot find an event with id: " + id);
                        err.status = 404;
                        return next(err);
        
                    }
                   
                }) 
                .catch(err=>next(err));
               

            } else {
                let err = new Error("Cannot find an event with id: " + id);
                err.status = 404;
                return next(err);

            }
        })
        .catch(err => next(err));

};



