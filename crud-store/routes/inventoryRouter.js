const express = require("express")
const inventoryRouter = express.Router()
const InventoryModel = require("../models/inventory.js")

// GET
inventoryRouter.get("/", (req, res, next) => {
    InventoryModel.find((err, items) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(items)
    })
})

// GET (one)
inventoryRouter.get("/:itemId", (req, res, next) => {
    InventoryModel.findOne({_id: req.params.itemId}, (err, foundItem) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(foundItem)
    })
})

// POST
inventoryRouter.post("/", (req, res, next) => {
    const newItem = new InventoryModel(req.body)
    newItem.save((err, savedItem) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedItem)
    })
})

// PUT
inventoryRouter.put("/:itemId", (req, res, next) => {
    InventoryModel.findOneAndUpdate(
        {_id: req.params.itemId},
        req.body,
        {new: true},
        (err, updatedItem) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedItem)
        }
    )
})

// DELETE
inventoryRouter.delete("/:itemId", (req, res, next) => {
    InventoryModel.findOneAndDelete({_id: req.params.itemId}, (err, deletedItem) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(`${deletedItem.name} was deleted from the database.`)
    })
})

module.exports = inventoryRouter

// added code for edge cases (check if tiem, deletedItem, updatedItem doesn't exist)
// from Noah Jensen and Adeeb

// inventoryRouter.route('/:itemId')
//   .put((req, res, next) => { // update one by id
//     InventoryItem.findOneAndUpdate(
//       { _id: req.params.itemId },
//       req.body,
//       { new: true },
//       (err, updatedItem) => {
//         if (err) {
//           res.status(500)
//           return next(err)
//         }
//         if (!updatedItem) {
//           res.status(404)
//           return next(new Error("Inventory item not found"))
//         }
//         return res.status(201).send(updatedItem)
//       }
//     )
//   })
//   .delete((req, res, next) => {
//     InventoryItem.findOneAndDelete(
//       { _id: req.params.itemId },
//       (err, deletedItem) => {
//         if (err) {
//           res.status(500)
//           return next(err)
//         }
//         if (!deletedItem) {
//           res.status(404)
//           return next(new Error("Inventory item not found"))
//         }
//         return res.status(200).send(`Successfully deleted ${deletedItem.title} from the inventory.`)
//       }
//     )
//   })
//   .get((req, res, next) => { // get one by id
//     InventoryItem.findOne(
//       { _id: req.params.itemId },
//       (err, item) => {
//         if (err) {
//           res.status(500)
//           return next(err)
//         }
//         if (!item) {
//           res.status(404)
//           return next(new Error("Inventory item not found"))
//         }
//         return res.status(200).send(item)
//       }
//     )
//   });