const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')
// functions to put into route handler functions inside the router file, 
// but separately to keep the files clean 

// get all workouts 
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1})
    res.status(200).json(workouts)
}
// get a single workout // not working yet 
const getWorkout = async (req, res) => {
    const {id} = req.params
    // first check if id is the type accepted by mongodb 
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }
    const workout = await Workout.findById(id)

    //if that workout doesn't exist
    if (!workout) { 
        return res.status(404).json({error: 'No such workout'})
    }

    res.status(200).json(workout)
}
// create new workout 
const createWorkout = async (req, res) => { 
    const {title, load, reps} = req.body

    // add doc to db 
    //try to do something, but there might be an error
    //so if there is, we'll catch the error and do something with it 
    try { 
        // storing the workout document/object
        const workout = await Workout.create({title, load, reps})
        res.status(200).json(workout)
        // 200 - everything is okay 
    } catch (error) { 
        res.status(400).json({error: error.message})
        // 400 there's a problem 
    }
}
// delete a workout 
const deleteWorkout = async (req, res) => { 
    const {id} = req.params
    // first check if id is the type accepted by mongodb 
    // if we don't check and it's invalid, it'll throw some type of internal error 
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }
    
    // the delete functions returns a response that is the deleted document 
    // which we stored in the workout const
    const workout = await Workout.findOneAndDelete({_id: id})

    if (!workout) { 
        return res.status(404).json({error: 'No such workout'})
    }
    // if workout is found, return 200 for OK and the deleted workout
    res.status(200).json(workout)

}

// update a workout 
const updateWorkout = async (req, res) => { 
    const {id} = req.params
   
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }
    
    // the delete functions returns a response that is the deleted document 
    // which we stored in the workout const
    const workout = await Workout.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    //check workoutexists
    if (!workout) { 
        return res.status(404).json({error: 'No such workout'})
    }
    res.status(200).json(workout)


}



// export the functions to use in the router file 

module.exports = {
    getWorkouts, 
    getWorkout,
    createWorkout, 
    deleteWorkout, 
    updateWorkout
}