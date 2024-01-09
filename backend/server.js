require('dotenv').config()

const express = require('express') // requiring express to run express app
const mongoose = require('mongoose') // requiring mongoose. mongoose ensures Object Data Model: Does the object fit a certain required criteria i.e. is it a string with 2 properties, etc. 

const recipeRoutes = require('./routes/recipes')

// Express application
const app = express()

//middleware to access the data sent from user request and attach it to req body
app.use(express.json())


app.use((req, res, next) => {
    console.log(req.path, req.method)
    next() // move on to next route after logging 
})

// route 
app.use('/api/recipes', recipeRoutes)

// connect to db 
mongoose.connect(process.env.MONGO_URI)  // asynchronous in nature (takes a bit of time to do), therefore in returns a "promise" 
    .then(() => { // .then method fires a function when the above asynchronous action is complete

        // user request listener
        app.listen(process.env.PORT, () => {
            console.log('connected to database, listening on port', process.env.PORT)
        })

    }) 
    .catch((error) => {
        console.log(error) // error could be: URI incorrect, username/password incorrect, etc. 
    })