const mongoose = require('mongoose')
const { Schema } = mongoose

const seatsSchema = new Schema({
    position: {
        type: String,
        required: true
    },
    is_occupied: {
        type: Boolean,
        required: true
    }
    // A1: {
    //     type: Boolean,
    //     default: false
    // },
    // A2: {
    //     type: Boolean,
    //     default: false
    // },
    // A3: {
    //     type: Boolean,
    //     default: false
    // },
    // A4: {
    //     type: Boolean,
    //     default: false
    // },
    // A5: {
    //     type: Boolean,
    //     default: false
    // },
    // B1: {
    //     type: Boolean,
    //     default: false
    // },
    // B2: {
    //     type: Boolean,
    //     default: false
    // },
    // B3: {
    //     type: Boolean,
    //     default: false
    // },
    // B4: {
    //     type: Boolean,
    //     default: false
    // },
    // B5: {
    //     type: Boolean,
    //     default: false
    // },
    // C1: {
    //     type: Boolean,
    //     default: false
    // },
    // C2: {
    //     type: Boolean,
    //     default: false
    // },
    // C3: {
    //     type: Boolean,
    //     default: false
    // },
    // C4: {
    //     type: Boolean,
    //     default: false
    // },
    // C5: {
    //     type: Boolean,
    //     default: false
    // },
    // D1: {
    //     type: Boolean,
    //     default: false
    // },
    // D2: {
    //     type: Boolean,
    //     default: false
    // },
    // D3: {
    //     type: Boolean,
    //     default: false
    // },
    // D4: {
    //     type: Boolean,
    //     default: false
    // },
    // D5: {
    //     type: Boolean,
    //     default: false
    // },
    // E1: {
    //     type: Boolean,
    //     default: false
    // },
    // E2: {
    //     type: Boolean,
    //     default: false
    // },
    // E3: {
    //     type: Boolean,
    //     default: false
    // },
    // E4: {
    //     type: Boolean,
    //     default: false
    // },
    // E5: {
    //     type: Boolean,
    //     default: false
    // },
    // F1: {
    //     type: Boolean,
    //     default: false
    // },
    // F2: {
    //     type: Boolean,
    //     default: false
    // },
    // F3: {
    //     type: Boolean,
    //     default: false
    // },
    // F4: {
    //     type: Boolean,
    //     default: false
    // },
    // F5: {
    //     type: Boolean,
    //     default: false
    // },
    // G1: {
    //     type: Boolean,
    //     default: false
    // },
    // G2: {
    //     type: Boolean,
    //     default: false
    // },
    // G3: {
    //     type: Boolean,
    //     default: false
    // },
    // G4: {
    //     type: Boolean,
    //     default: false
    // },
    // G5: {
    //     type: Boolean,
    //     default: false
    // },
    // H1: {
    //     type: Boolean,
    //     default: false
    // },
    // H2: {
    //     type: Boolean,
    //     default: false
    // },
    // H3: {
    //     type: Boolean,
    //     default: false
    // },
    // H4: {
    //     type: Boolean,
    //     default: false
    // },
    // H5: {
    //     type: Boolean,
    //     default: false
    // }
   
}, {timestamps: true})

module.exports = mongoose.model('Seats', seatsSchema)
