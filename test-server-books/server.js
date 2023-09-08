const express = require("express")
const app = express()
const morgan = require("morgan")
const mongoose = require("mongoose")

app.use(express.json())
app.use(morgan("dev"))

mongoose.connect("mongodb://localhost:27017/test-books-db", () => console.log("Connected to the database."))

app.use("/books", require("./routes/bookRouter.js"))
app.use("/authors", require("./routes/authorRouter.js"))

app.use((err, req, res, next) => {
    console.log(err)
    return res.send({errMsg: err.message})
})

app.listen(8002, () => {
    console.log("The server is running on Port 8002.")
})