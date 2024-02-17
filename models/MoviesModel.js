const mongoose = require('mongoose')
const { Schema } = mongoose

// list of attributes
//  m_title, m_desc, m_genre,m_type, m_mpa, m_hrs, m_date, m_starttime,  m_endtime, m_price, m_cinema, m_poster, m_type
const moviesSchema = new Schema({
    m_title: {
        type: String,
        required: true
    },
    m_desc: {
        type: String,
        required: false
    },
    m_genre: {
        type:String,
        required: false
    },
    m_type: {
        type:String,
        required: false
    },
    m_mpa: {
        type: String,
        required: false
    },
    m_hrs: {
        type: Number,
        required: false
    },
    m_date: {
        type: Date,
        required: false
    },
    m_starttime: {
        type: Date,
        required: false
    },
    m_endtime: {
        type: Date,
        required: false
    },
    m_price: {
        type: Number,
        required: false
    },
    m_cinema: {
        type: Number,
        required: false
    },
    m_poster: {
        type: String,
        required: false
    },
    m_seat: [
        {
            position: {
                type: String,
                required: false
            },
            is_occupied: {
                type: Boolean,
                required: false
            }
        }
    ]
}, {timestamps: true})

module.exports = mongoose.model('Movies', moviesSchema)