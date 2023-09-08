const express = require("express")
const app = express()
// const {v4: uuidv4} = require("uuid")
// then call uuid with uuidv4()
const morgan = require("morgan")
const mongoose = require("mongoose")

// Middleware (for every request)
app.use(express.json())
app.use(morgan('dev'))

// connect to the database
mongoose.connect("mongodb://localhost:27017/movies-test-db", 
() => console.log("Connected to the database."))

// Routes
app.use("/movies", require("./routes/movieRouter.js"))
app.use("/tvshows", require("./routes/tvshowRouter.js"))


// Error handler
app.use((err, req, res, next) => {
    console.log(err)
    return res.send({errMsg: err.message})
})

// Server listen
app.listen(9000, () => {
    console.log("The server is running on Port 9000")
})



