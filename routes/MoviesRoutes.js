const express = require('express');
const {
    createMovies,
    getMovies,
    getMovie,
    deleteMovies,
    updateMovies,

    updateSeatOccupancy,
    getMoviesByDate,

} = require('../controllers/moviesController')

const router = express.Router();

// POST A NEW MOVIES
router.post('/', createMovies)



// GET SINGLE MOVIE
router.get('/:id', getMovie)

// DELETE A SINGLE MOVIES
router.delete('/:id', deleteMovies);

// UPDATE SINGLE MOVIES
router.patch('/:id', updateMovies);

router.patch('/:movieId/:position', updateSeatOccupancy);

router.get('/date/:date', getMoviesByDate);

module.exports = router;
