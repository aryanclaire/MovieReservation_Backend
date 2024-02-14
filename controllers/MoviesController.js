const mongoose = require('mongoose')

// import model
const Movies = require('../models/MoviesModel')
const Seats = require('../models/SeatsModel')


// CREATE NEW 
const createMovies = async (req, res) => {
    const { m_title, m_desc, m_genre, m_mpa, m_hrs, m_date, m_starttime, m_endtime, m_price, m_cinema, m_poster } = req.body;

    // add doc to db
    try {
        const rows = 8;
        const seatsPerRow = 5;
        const seatLayout = await Promise.all(Array.from({ length: rows }, async (_, rowIndex) =>
            Promise.all(Array.from({ length: seatsPerRow }, async (_, seatIndex) => {
                const seat = seatIndex + 1;
                const seatPosition = String.fromCharCode(65 + rowIndex) + seat; // Concatenate row and seat
                const seatIsOccupied = false; // Assuming the seat is initially not occupied
                const seatDoc = await Seats.create({ position: seatPosition, is_occupied: seatIsOccupied });
                return seatDoc; // Return the created seat
            }))
        ));

        // Create the movie
        const movie = await Movies.create({
            m_title, m_desc, m_genre, m_mpa, m_hrs, m_date, m_starttime, m_endtime, m_price, m_cinema, m_poster
        });

        // Associate the created seats with the movie
        movie.m_seat = seatLayout.flat(); // Assuming the movie schema has m_seat field for storing seats
        await movie.save();

        res.status(200).json(movie);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


// GET ALL MOVIES  
const getMovies = async (req, res) => {
    const movies = await Movies.find({}).sort({createdAt: -1})
    res.status(200).json(movies)
}

// GET A SINGLE MOVIES
const getMovie = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such movie'})
    }
    const movies = await Movies.findById(id)

    if(!movies) {
        return res.status(404).json({errror: 'No such movie'})
    }
    res.status(200).json(movies)
}

// DELETE SINGLE MOVIES
const deleteMovies = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such movies'})
    }

    const movies = await Movies.findOneAndDelete({_id: id})

    if(!movies) {
        return res.status(400).json({errror: 'No such movies'})
    }
    res.status(200).json(movies)
}

// UPDATE SINGLE MOVIES
const updateMovies = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such movies'})
    }

    const movies = await Movies.findOneAndUpdate({_id:id}, {
        ...req.body
    })

    if(!movies) {
        return res.status(400).json({errror: 'No such movies'})
    }
    res.status(200).json(movies)
}


// export function
module.exports = {
    createMovies,
    getMovies,
    getMovie,
    deleteMovies,
    updateMovies
}