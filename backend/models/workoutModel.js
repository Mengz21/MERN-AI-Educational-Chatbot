const mongoose = require('mongoose')

const Schema = mongoose.Schema

const workoutSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    reps:{
        type: Number,
        required: true
    },
    load:{
        type: Number,
        required: true
    }
}, { timestamps: true })

// make a model based on the schema 
// model applies schema 
// schema defines a document in the model 

// creates a new model named Workout, and collection Workouts if it doesn't exist
module.exports = mongoose.model('Workout' ,  workoutSchema)
// now we can import and use this model in other files 

 