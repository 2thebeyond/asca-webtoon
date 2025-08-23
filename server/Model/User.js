const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    email: String,
    displayName: String,
    uid: String,
    userNum: Number,
    isAdmin: { type: Boolean, default: "false" },
    },
    { collection: "users" }
);
const User = mongoose.model('User', userSchema);
module.exports = { User };