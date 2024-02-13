const Movies = require('../models/workoutModel')
const mongoose = require('mongoose')

// create a new movies
const createMovies = async (req, res) => {
    const {m_title, m_desc, m_genre, m_mpa, m_hrs, m_date, m_starttime,  m_endtime, m_price, m_cinema, m_poster}
    = req.body;

    try {
        const movies = await Movies.create({ m_title, m_desc, m_genre, m_mpa, m_hrs, m_date, m_starttime,  m_endtime, m_price, m_cinema, m_poster });
        res.status(200).json(movies);
    } catch {
        res.status(400).json({ error: error.message });
    }
    // const { title, load, reps } = req.body;

   
    // try {
    //     const workout = await Workout.create({ title, load, reps });
    //     res.status(200).json(workout);
    // } catch (error) {
    //     res.status(400).json({ error: error.message });
    // }
}


// export function
module.exports = {
    createMovies,
}