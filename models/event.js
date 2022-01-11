const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
name: {type: String, required:[true,'name is required']},
topic:{type: String, required:[true,'topic is required']},
details: {type: String, required: [true,'content is required'], 
            minlength: [10, 'the content should have at least 10 characters']},
date:{type: Date, required:[true,'Date is required']},
start_time:{type: String, required:[true,'Start time is required']},
end_time:{type: String, required:[true,'End time is required']},
host_name:{type:Schema.Types.ObjectId,ref: 'User'},
venue:{type: String, required:[true,'Venue is required']},
image:{type: String, required:[true,'Image is required']},
},
{timestamps: true}
);

//collection name is stories in the database
module.exports = mongoose.model('event', eventSchema);
