const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ScheduleSchema = new Schema({
    uuid:{
        type: String,
        required: true,
        unique: true
    },
    type:{
        type: String,
        required: false
    },
    description:{
        type: String,
        required: false,
    },
    author:{
        type: String,
        required: true,
    }  
});
module.exports = Schedule = mongoose.model('schedule', ScheduleSchema);
