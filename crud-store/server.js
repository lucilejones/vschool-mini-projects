const express = require("express")
const app = express()
const morgan = require("morgan")
const mongoose = require("mongoose")

// middleware
app.use(express.json())
app.use(morgan("dev"))

// connect to the database
mongoose.connect("mongodb://localhost:27017/crud-store-db", () => console.log("Connected to the database"))

// routes
app.use("/items", require("./routes/inventoryRouter.js"))

// error handler
app.use((err, req, res, next) => {
    console.log(err)
    return res.send({errMsg: err.message})
})

// server listen
app.listen(8995, () => {
    console.log("The server is running on Port 8995")
})