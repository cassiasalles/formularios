const mongoose = require('mongoose');
const PointSchema = require('./utils/PointSchema')

// setando os campos da collection answers 
const UserSchema = new mongoose.Schema({
    user: String,
    date: Date,
    title: String,
    questions: Array,
    form_id: String,
    answers: Array,
    location: { 
        type: PointSchema,
        index: '2dsphere'
    }
})

module.exports = mongoose.model('Answer', UserSchema);