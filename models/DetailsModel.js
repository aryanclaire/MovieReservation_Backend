const mongoose = require('mongoose')
const { Schema } = mongoose

const detailsSchema = new Schema({
    res_id: {
        type: String,
        required: false
    },
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
        type: Number,
        required: true
    },
    isCancel: {
        type: Boolean,
        required: false
    },
    seat: {
        type: Array,
        required: false
    },
    amt_pay: {
        type: Number,
        required: false
    },
    m_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "MoviesModel",
        // type: String,
        required: false
    }
}, {timestamps: true})

module.exports = mongoose.model('Details', detailsSchema)
