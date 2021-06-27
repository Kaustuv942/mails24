const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MailSchema = new Schema({
    from:{
      type: String,
      required: true,
    },
    to:{
      type: String,
      required: true,
    },
    cc:{
      type: String,
      required: false,
    },
    bcc:{
      type: String,
      required: false,
    },
    subject:{
      type: String,
      required: true,
    },
    text:{
      type: String,
      required: true,
    },
});
module.exports = Mail = mongoose.model('mail', MailSchema);
