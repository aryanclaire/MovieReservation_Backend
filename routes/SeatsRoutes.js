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

// GET ALL SEATS
router.get('/:id', getSeats)

// GET SINGLE SEAT
router.get('/:m_id/:id', getSeat)

// // DELETE A SINGLE SEATS
// router.delete('/:id', deleteMovies);

// UPDATE SINGLE SEAT
router.patch('/:r_id/:id', updateSeat)

module.exports = router;
