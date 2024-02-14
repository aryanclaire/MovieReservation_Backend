const mongoose = require('mongoose')

// import model
const Details = require('../models/DetailsModel')
const Movies = require('../models/MoviesModel')


// CREATE NEW 
const createDetails = async (req, res) => {
    const { f_name, m_name, l_name, senior } = req.body;

    try {
        const details = await Details.create({ f_name, m_name, l_name, senior });
        res.status(200).json(details);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// GET ALL MOVIES  
const getDetails = async (req, res) => {
    const details = await Details.find({}).sort({createdAt: -1})
    res.status(200).json(details)
}



// export function
module.exports = {
    createDetails,
    getDetails
}