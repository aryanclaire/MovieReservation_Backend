const express = require('express');
const {
    createDetails,
    getDetails,
    updateReservation
} = require('../controllers/DetailsController')

const router = express.Router();

// POST A NEW MOVIES
router.post('/', createDetails)

// GET ALL DETAILS
router.get('/', getDetails)

router.patch('/:id', updateReservation);


module.exports = router;
