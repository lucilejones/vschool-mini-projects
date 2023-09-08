const express = require("express")
const app = express()

const object = {
    name: "Luci",
    favColor: "teal",
    job: "web developer",
    home: "Utah"
}

app.use("/", require("./middleware.js"))

app.get("/", (req, res) => {
    res.send(object)
    // res.send(req.newProperty)
    // console.log(req.newProperty)
})

app.listen(7000, () => {
    console.log("The server is running on Port 7000")
})