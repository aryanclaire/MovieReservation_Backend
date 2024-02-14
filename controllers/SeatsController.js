const mongoose = require('mongoose')

// import model
const Seats = require('../models/SeatsModel')


// CREATE NEW 
const createSeats = async (req, res) => {
    // const { position, is_occupied } = req.body;
    // const { id } = req.m_id
    try {
        const rows = 8;
        const seatsPerRow = 5;
        const seatLayout = await Promise.all(Array.from({ length: rows }, async (_, rowIndex) =>
            Promise.all(Array.from({ length: seatsPerRow }, async (_, seatIndex) => {
                const seat = seatIndex + 1;
                const seatPosition = String.fromCharCode(65 + rowIndex) + seat; // Concatenate row and seat
                const seatIsOccupied = false; // Assuming the seat is initially not occupied
                const seats = await Seats.create({ position: seatPosition, is_occupied: seatIsOccupied });
                return seats; // Return the created seat
            }))
        ));
        res.status(200).json(seatLayout); // Return the seat layout
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// GET ALL SEATS  
const getSeats = async (req, res) => {
    const seats = await Seats.find({}).sort({createdAt: -1})
    res.status(200).json(seats)
}

// GET A SINGLE SEAT
const getSeat = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such seat'})
    }
    const seats = await Seats.findById(id)

    if(!seats) {
        return res.status(404).json({error: 'No such seat'})
    }
    res.status(200).json(seats)
}

// UPDATE SINGLE MOVIES
const updateSeat = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such seat'})
    }

    const seats = await Seats.findOneAndUpdate({_id:id}, {
        ...req.body
    })

    if(!seats) {
        return res.status(400).json({errror: 'No such seat'})
    }
    res.status(200).json(seats)
}

// export function
module.exports = {
    createSeats,
    getSeats,
    getSeat,
    // deleteMovies,
    updateSeat
}