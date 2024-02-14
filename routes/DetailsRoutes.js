const express = require('express');
const {
    createDetails,
    getDetails
} = require('../controllers/DetailsController')

const router = express.Router();

// POST A NEW MOVIES
router.post('/', createDetails)

// GET ALL DETAILS
router.get('/', getDetails)

module.exports = router;
