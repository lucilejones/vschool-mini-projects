const express = require("express")
const movieRouter = express.Router()
// const {v4: uuidv4} = require("uuid")
// then call uuid with uuidv4()
const Movie = require("../models/movie.js")

// const movies = [
//     {title: "Pride and Predjudice", genre: "classic", _id: uuidv4()},
//     {title: "A New Hope", genre: "space fantasy", _id: uuidv4()},
//     {title: "Rookie of the Year", genre: "family", _id: uuidv4()}
// ]

// GET all
// movieRouter.get("/", (req, res, next) => {
//     res.status(200)
//     res.send(movies)
// })
movieRouter.get("/", (req, res, next) => {
    Movie.find((err, movies) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(movies)
    })
})

// GET one
// movieRouter.get("/:movieId", (req, res, next) => {
//     // console.log(req.params.movieId)
//     const movieId = req.params.movieId
//     const foundMovie = movies.find(movie => movie._id === movieId)
//     if(!foundMovie) {
//         const error = new Error(`The item with id ${movieId} was not found.`)
//         res.status(500)
//         return next(error)
//     }
//     res.status(200).send(foundMovie)
// })

// GET by genre
// is possible to build this into the GET all route
// movieRouter.get("/search/genre", (req, res, next) => {
//     const genre = req.query.genre
//     if(!genre){
//         const error = new Error("You must provide a genre.")
//         res.status(500)
//         return next(error)
//     }
//     const filteredMovies = movies.filter(movie => movie.genre === genre)
//     res.status(200).send(filteredMovies)
// })
movieRouter.get("/search/genre", (req, res, next) => {
    Movie.find({genre: req.query.genre}, (err, movies) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(movies)
    })
})

// POST one
// movieRouter.post("/", (req, res) => {
//     const newMovie = req.body
//     newMovie._id = uuidv4()
//     movies.push(newMovie)
//     res.status(201).send(newMovie)
// })
movieRouter.post("/", (req, res, next) => {
    const newMovie = new Movie(req.body)
    newMovie.save((err, savedMovie) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedMovie)
    })
})

// DELETE one
// movieRouter.delete("/:movieId", (req, res) => {
//     const movieId = req.params.movieId
//     const movieIndex = movies.findIndex(movie => movie._id === movieId)
//     movies.splice(movieIndex, 1)
//     res.send("Successfully removed movie from the database.")
// })
movieRouter.delete("/:movieId", (req, res, next) => {
    Movie.findOneAndDelete({_id: req.params.movieId}, (err, deletedItem) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(`Successfully deleted ${deletedItem.title} from the database.`)
    })
})


// UPDATE one
// movieRouter.put("/:movieId", (req, res) => {
//     const movieId = req.params.movieId
//     const updateObject = req.body
//     const movieIndex = movies.findIndex(movie => movie._id === movieId)
//     const updatedMovie = Object.assign(movies[movieIndex], updateObject)
//     res.status(201).send(updatedMovie)
// })
movieRouter.put("/:movieId", (req, res, next) => {
    Movie.findOneAndUpdate(
        {_id: req.params.movieId},
        req.body,
        {new: true},
        (err, updatedMovie) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedMovie)
        }
    )
})


// other possible syntax:
// movieRouter.route("/")
//     .get((req, res) => {
//         res.send(movies)
//     })
//     .post((req, res) => {
//         const newMovie = req.body
//         newMovie._id = uuidv4()
//         movies.push(newMovie)
//         res.send(`The movie ${newMovie.title} was added to the database`)
//     })

module.exports = movieRouter