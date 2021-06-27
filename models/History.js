const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HistorySchema = new Schema({
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
    lastSent:{
        type: Date,
        required: true,
    },  
    author:{
        type: String,
        required: true,
    }  
});
module.exports = History = mongoose.model('history', HistorySchema);
