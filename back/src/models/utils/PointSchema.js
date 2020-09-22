const mongoose = require('mongoose');

// setando o campo de coordenada
const PointSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true,
    },
    coordinates: {
         type: [Number],
         required: true,
    },
});
module.exports = PointSchema;