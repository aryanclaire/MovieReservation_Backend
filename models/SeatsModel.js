const mongoose = require('mongoose')
const { Schema } = mongoose


const seatsSchema = new Schema({
    // m_id:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Movie'
    // },
    position: {
        type: String,
        required: true
    },
    is_occupied: {
        type: Boolean,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Seats', seatsSchema)
