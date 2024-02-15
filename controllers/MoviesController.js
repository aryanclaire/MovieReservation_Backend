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
                const seatIsOccupied = true; // Assuming the seat is initially not occupied
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
    const { id } = req.params;

    // Validate movie ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such movie' });
    }

    try {
        // Update the movie
        const movie = await Movies.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });

        // Check if the movie exists
        if (!movie) {
            return res.status(404).json({ error: 'No such movie' });
        }

        // Update associated seats (Assuming m_seat contains seat IDs)
        const updatedSeats = await Seats.updateMany({ m_id: id }, { ...req.body });

        // Send the response with updated movie and seats
        res.status(200).json({ movie, updatedSeats });
    } catch (error) {
        // Handle errors
        res.status(500).json({ error: error.message });
    }
};




const updateMovieSeat = async (req, res) => {
    const { m_id, position } = req.params;
    if (!mongoose.Types.ObjectId.isValid(m_id)) {
        return res.status(404).json({ error: 'Invalid movie ID' });
    }

    try {
        const movie = await Movies.findById(m_id);
        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        // Find the seat index in the m_seat array by position
        const seatIndex = movie.m_seat.findIndex(seat => seat.position === position);
        if (seatIndex === -1) {
            return res.status(404).json({ error: 'Seat not found' });
        }

        // Update is_occupied field of the found seat
        movie.m_seat[seatIndex].is_occupied = false;

        // Save the updated movie document
        const updatedMovie = await movie.save();

        res.status(200).json(updatedMovie);
    } catch (error) {
        console.error('Error updating movie seat:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


// export function
module.exports = {
    createMovies,
    getMovies,
    getMovie,
    deleteMovies,
    updateMovies,
    updateMovieSeat
}