const mongoose = require('mongoose');
const PointSchema = require('./utils/PointSchema')

// setando os campos da collection forms
const UserSchema = new mongoose.Schema({
    user: String,
    date: Date,
    title: String,
    questions: Array,
})

module.exports = mongoose.model('Form', UserSchema);