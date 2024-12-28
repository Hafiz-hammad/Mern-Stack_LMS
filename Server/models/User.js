const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    hasBoughtCourse: { type: Boolean, default: false },
    userName : String,
    userEmail :String,
    password : String,
    role : String
});
module.exports = mongoose.model('User', UserSchema)