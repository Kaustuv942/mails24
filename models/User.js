const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    gId:{
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: false,
    },
    imageUrl:{
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    accessToken: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: false,
    }
});
module.exports = User = mongoose.model('user', UserSchema);
