const express = require("express")
// const middleware = express()

function middleware(req, res, next) {
    req.newProperty = {details: "running"}
    console.log("using the middleware")
    console.log(req.newProperty)
    next()
}

module.exports = middleware