const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JobSchema = new Schema({
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
        required: true,
    },
    total:{
        type: String,
        required: true,
    },   
    max:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true,
    }
});
module.exports = Job = mongoose.model('job', JobSchema);
