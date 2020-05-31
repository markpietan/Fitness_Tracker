const express = require("express")
const bodyparser = require("body-parser")
const morgan = require("morgan")
const server = express()
const {PORT= 3000} = process.env
const apiRouter = require("./api/index")
const { client } = require("./db/index")
require("dotenv").config({path: "/Users/markpietan/curriculum/Fitness_Tracker/.env"})
server.use(bodyparser.json())
server.use(morgan("dev"))

server.listen(PORT)
server.use("/api", apiRouter)
client.connect()
