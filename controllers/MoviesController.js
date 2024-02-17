const mongoose = require('mongoose')

// import model
const Movies = require('../models/MoviesModel')


// CREATE NEW MOVIE
const createMovies = async (req, res) => {
    const { m_title, m_desc, m_genre, m_type, m_mpa, m_hrs, m_date, m_starttime, m_endtime, m_price, m_cinema, m_poster } = req.body;

    // Create m_seat array
    const m_seat = [];
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const columns = ['1', '2', '3', '4', '5'];
    
    rows.forEach(row => {
        columns.forEach(column => {
            m_seat.push({
                position: `${row}${column}`,
                is_occupied: false
            });
        });
    });

    // Add document to the database
    try {
        const movie = await Movies.create({ m_title, m_desc, m_genre, m_type, m_mpa, m_hrs, m_date, m_starttime, m_endtime, m_price, m_cinema, m_poster, m_seat });
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


// UPDATE SEAT
const updateSeatOccupancy = async (req, res) => {
    const { movieId, position } = req.params;

    // Validate movie ID
    if (!mongoose.Types.ObjectId.isValid(movieId)) {
        return res.status(404).json({ error: 'Invalid movie ID' });
    }

    try {
        // Find the movie by ID
        const movie = await Movies.findById(movieId);
        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        // Find the seat in the movie's seat array
        const seat = movie.m_seat.find(seat => seat.position === position);
        if (!seat) {
            return res.status(404).json({ error: 'Seat not found' });
        }

        // Update is_occupied property of the seat
        seat.is_occupied = true;

        // Save the movie with updated seat occupancy
        await movie.save();

        return res.status(200).json({ message: 'Seat occupancy updated successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

// UPDATE SEAT VACANCY
const updateSeatVacancy = async (req, res) => {
    const { movieId, position } = req.params;

    // Validate movie ID
    if (!mongoose.Types.ObjectId.isValid(movieId)) {
        return res.status(404).json({ error: 'Invalid movie ID' });
    }

    try {
        // Find the movie by ID
        const movie = await Movies.findById(movieId);
        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        // Find the seat in the movie's seat array
        const seat = movie.m_seat.find(seat => seat.position === position);
        if (!seat) {
            return res.status(404).json({ error: 'Seat not found' });
        }

        // Update is_occupied property of the seat
        seat.is_occupied = false;

        // Save the movie with updated seat occupancy
        await movie.save();

        return res.status(200).json({ message: 'Seat occupancy updated successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
const getMoviesByDate = async (req, res) => {
    const { date } = req.params;

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return res.status(400).json({ error: 'Invalid date format' });
    }

    try {
        // Find movies where m_date is equal to the provided date
        const movies = await Movies.find({ m_date: new Date(date) });

        res.status(200).json(movies);
    } catch (error) {
        console.error('Error fetching movies by date:', error);
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
    updateSeatOccupancy,
    getMoviesByDate,
    updateSeatVacancy
}