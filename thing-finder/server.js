const express = require("express")
const app = express()

const inventoryItems = [
    {
        name: "banana",
        type: "food",
        price: 200,
    },{
        name: "pants",
        type: "clothing",
        price: 2500,
    },{
        name: "basket ball",
        type: "toy",
        price: 1000,
    },{
        name: "rockem sockem robots",
        type: "toy",
        price: 1500,
    },{
        name: "shirt",
        type: "clothing",
        price: 800,
    },{
        name: "soup",
        type: "food",
        price: 300,
    },{
        name: "flour",
        type: "food",
        price: 100,
    }
]

// app.get("/items", (req, res) => {
//     if(req.query.type) {
//         const type = req.query.type
//         const filteredItems = inventoryItems.filter(item => item.type === type)
//         res.send(filteredItems)
//     } else {
//         res.send(inventoryItems)
//     }
//     // const {name, type, price} = req.query
//     // console.log(req.query)
// })

app.get("/items", (req, res) => {
    // const price = req.query.price
    if (!req.query.min || !req.query.max) {
        req.query.min = 0
        req.query.max = 1000000
        const filteredItems = inventoryItems.filter(item => item.price >= req.query.min && item.price <= req.query.max)
        res.send(filteredItems)
    } else {
        const filteredItems = inventoryItems.filter(item => item.price >= req.query.min && item.price <= req.query.max)
        res.send(filteredItems)
        console.log(req.query)
    }
})
// GET requet to: localhost:8000/items?min=200&max=1000


app.listen(8000, () => {
    console.log("The server is running on Port 8000")
})