const express = require("express")
const bodyparser = require("body-parser")
const morgan = require("morgan")
const server = express()
const {PORT= 3000} = process.env
const userRouter = require("./routes/user.js")
const { client } = require("./db/index")
server.use(bodyparser.json())
server.use(morgan("dev"))

server.listen(PORT)
server.use("/users", userRouter)
client.connect()
