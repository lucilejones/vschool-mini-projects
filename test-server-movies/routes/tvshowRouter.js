const express = require("express")
const tvshowRouter = express()
const {v4: uuidv4} = require("uuid")


const tvShows = [
    {title: "Brooklyn99", _id: uuidv4()},
    {title: "I Love Lucy", _id: uuidv4()},
    {title: "The Good Place", _id: uuidv4()}
]

// GET all
tvshowRouter.get("/", (req, res) => {
    res.send(tvShows)
})

// GET one
tvshowRouter.get("/:tvshowId", (req, res) => {
    const tvShowId = req.params.tvshowId
    const foundShow = tvShows.find(show => show._id === tvShowId)
    res.send(foundShow)
})

// POST one
tvshowRouter.post("/", (req, res) => {
    const newShow = req.body
    newShow._id = uuidv4()
    tvShows.push(newShow)
    res.send(`Successfully added ${newShow} to the database.`)
})

module.exports = tvshowRouter