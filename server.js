// npm init -y
// npm install express
//npm install -g nodemon (another way)
//npm install dotenv
//npm install mongodb
// npm install mongoose
// npm install cors

require('dotenv').config()

// import
const express = require('express');
const cors = require('cors'); 
const mongoose = require('mongoose')
// const workoutRoutes = require('./routes/workouts.js') //NOT 
const app = express();

// Enable CORS for all routes
app.use(cors());

// middleware
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// routes
// app.use('/api/workouts', workoutRoutes);

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen request
        app.listen(process.env.PORT, () => {
            console.log('Server is running on port', process.env.PORT);
        });
    })
    .catch((error) => {
        console.log(error)
    })

