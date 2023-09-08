const express = require("express")
const todoRouter = express()
const {v4: uuidv4} = require("uuid")

const todos = [
    {
        name: "get milk",
        description: "We need whole, 1%, and 2%",
        imageUrl: "",
        completed: false,
        _id: uuidv4()
    }
]

// to practice adding new todos:
// {
//     "name": "buy tickets",
//     "description": "Muse is coming to Salt Lake!",
//     "imageUrl": "",
//     "completed": false
// }

// get all todos
todoRouter.get("/", (req, res) => {
    res.send(todos)
})

// get one todo
todoRouter.get("/:todoId", (req, res) => {
    const todoId = req.params.todoId
    const foundToDo = todos.find(todo => todo._id === todoId)
    res.send(foundToDo)
})

// add one todo
todoRouter.post("/", (req, res) => {
    const newToDo = req.body
    newToDo._id = uuidv4()
    todos.push(newToDo)
    res.send(`The new todo item ${newToDo.name} was added to the list.`)
})

// update one todo
todoRouter.put("/:todoId", (req, res) => {
    const todoId = req.params.todoId
    const updateInfo = req.body
    const todoIndex = todos.findIndex(todo => todo._id === todoId)
    const updatedToDo = Object.assign(todos[todoIndex], updateInfo)
    res.send(updatedToDo)
})

// delete one todo
todoRouter.delete("/:todoId", (req, res) => {
    const todoId = req.params.todoId
    const todoIndex = todos.findIndex(todo => todo._id === todoId)
    const todo = todos.find(todo => todo._id === todoId)
    todos.splice(todoIndex, 1)
    res.send(`Successfully removed ${todo.name} from the list.`)
})

module.exports = todoRouter