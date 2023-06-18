const express = require('express')
// import workout controller functions
const { 
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout, 
    updateWorkout
} = require('../controllers/workoutController')
// creates an instance of the router 
const router = express.Router()

// attaches a handler to this router 
// GET all workouts
router.get('/', getWorkouts)
// we don't have access to the express app here, so we can't use "app.post or app.get" 
// to create a route, so we'll use the express Router 


// GET a single workout 
router.get('/:id', getWorkout)

// POST a new workout 
router.post('/', createWorkout)
// if we want to add a new workout or edit one, we need to send the info to the server
// we can access that from the req object, which we can only access with middleware in the express app 

// DELETE a workout 
router.delete('/:id', deleteWorkout)

// UPDATE a workout 
router.patch('/:id', updateWorkout)


//export the router at the end 
module.exports = router 