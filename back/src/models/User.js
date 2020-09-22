const mongoose = require('mongoose');

// Setando campos da collection User
const UserSchema = new mongoose.Schema({
    name: String,
    user: String,
    password: String,
})

module.exports = mongoose.model('User', UserSchema);