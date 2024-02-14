const express = require('express');
const {
    createMovies,
    getMovies,
    getMovie,
    deleteMovies,
    updateMovies,
    updateMovieSeat
} = require('../controllers/moviesController')

const router = express.Router();

// POST A NEW MOVIES
router.post('/', createMovies)

// GET ALL MOVIES
router.get('/', getMovies)

// GET SINGLE MOVIE
router.get('/:id', getMovie)

// DELETE A SINGLE MOVIES
router.delete('/:id', deleteMovies);

// UPDATE SINGLE MOVIES
router.patch('/:id', updateMovies);
router.patch('/updateMovieSeat/:m_id/:position', updateMovieSeat);

module.exports = router;
