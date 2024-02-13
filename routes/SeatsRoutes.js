const express = require('express');
const {
    createSeats,
    getSeats,
    getSeat,
    // deleteMovies,
    updateSeat
} = require('../controllers/SeatsController')

const router = express.Router();

// POST A NEW MOVIES
router.post('/', createSeats)

// GET ALL MOVIES
router.get('/', getSeats)

// GET SINGLE MOVIE
router.get('/:id', getSeat)

// // DELETE A SINGLE MOVIES
// router.delete('/:id', deleteMovies);

// UPDATE SINGLE MOVIES
router.patch('/:id', updateSeat)

module.exports = router;
