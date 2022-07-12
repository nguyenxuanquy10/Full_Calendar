const mongoose = require('mongoose')
const { Schema } = mongoose;

const eventSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    start: {
        type: String,
        required: true,
    },
    end: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        trim: true,
        required: true,
    },
    isOrder: {
        type: Number,
        default: 0,
    },
    room: {
        type: String,
        trim: true
    }
})

const eventModel = mongoose.model('events', eventSchema);

module.exports = eventModel;