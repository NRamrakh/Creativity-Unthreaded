const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rsvpSchema = new Schema({

rsvp: {type: String, required:[true,'rsvp is required']},
eventId:{type:Schema.Types.ObjectId,ref: 'event',required: [true,'eventId is required']},
userId:{type:Schema.Types.ObjectId,ref: 'User'}
},
{timestamps: true}
);

//collection name is stories in the database
module.exports = mongoose.model('rsvp', rsvpSchema);
