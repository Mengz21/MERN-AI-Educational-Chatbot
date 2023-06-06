require('dotenv').config()

const express = require('express')
// require the express package

const mongoose = require('mongoose')

//require the router files 
const workoutRoutes = require('./routes/workouts')

// start up the express app, we stored it in the app constant 
const app = express()

//middleware so that workouts.js has access to req object 
app.use(express.json())
// FOR every app that comes in, it looks to have if there's some body to the request 
// e.g. some data we're sending to the server
// IF IT DOES, ATTACHES IT TO THE REQ OBJECT, then we can use via req.body  

// global middleware, fires the function in the argument for every request that comes in 
// we have to invoke the next function at the end of the middleware to 
// move on to the next piece of the middleware (e.g. the function specifically handling the request)
app.use((req, res, next) => {
    // this just logs all requests we receive in the terminal
    console.log(req.path, req.method)
    next()
 })

//ROUTES
// react to requests using route handlers: 
// this responds to a get request coming in
// we can specify a specific route for this get request '/'
// so if we go to port 4000/ , it will fire the function (the second argument) to handle that request 
//app.get('/', (req, res) => { DON'T NEED THIS ANYMORE, JUST A TEST THAT OUR APP WORKS 
// WE'LL USE THE ROUTES WE CREATED IN THE SEPARATE ROUTE FILES 
// EQUAL TO ROUTER.GET('/' ... ) IN THE ROUTER FILE 
    // request object has information about the request 
    // response object we use to send a response back to the browser 
    //res.json({mssg: 'Welcome to AI Discovery!'})
//})
// listen for requests 
// used the environmental variable in .env that stores the port number 

// grabs the routes we've attached to this router and uses it on this app 
//app.use(workoutRoutes)
// actually, we want to only fire these routes when we've reached a specific path, so: 
app.use('/api/workouts/', workoutRoutes)
// so when we fire a request to this route '/api/workouts/', use these routes workoutRoutes
// THIS MEANS THAT THE ROUTES SPECIFIED IN WORKOUTROUTES GETS ADDED TO THE END OF /api/workouts 
// '/' becomes '/api/workouts/' 

//CONNECT to DB 
// this function is asynchronous in nature, thus takes a little time to do 
// thus returns a promise and we can tack on a .then() method 
// to fire a function when it's complete. 
// and a .catch() to catch anhy error 
mongoose.connect(process.env.MONG_URI)
    .then(() => {
        // put listen here because we don't want to listen for requests until we're connected to DB 
        app.listen(process.env.PORT, () => { 
            // when it's done, fire this function that displays this message in the terminal 
            console.log('listening on port 4000')
        })
    })
    .catch((error) => {
        console.log(error)
    })



// mfzhang99
// YMRS7tvcsCcbPVus
// 63.235.138.196/32   My IP Address