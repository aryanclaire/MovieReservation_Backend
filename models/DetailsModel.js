const mongoose = require('mongoose')
const { Schema } = mongoose

const detailsSchema = new Schema({
    f_name: {
        type: String,
        required: true
    },
    m_name: {
        type: String,
        required: true
    },
    l_name: {
        type:String,
        required: true
    },
    senior: {
        type: Boolean,
        required: false
    },
    seat: [
        {
            s_id:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "SeatsModel",
                type: String,
                required: true
            }
        }
    ],
    m_id:{
        type: mongoose.Schema.Types.ObjectId,
        type: String,
        ref: "MoviesModel",
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Details', detailsSchema)
