const express = require("express")
const bodyparser = require("body-parser")
const server = express()
const {PORT= 3000} = process.env

server.use(bodyparser.json())
server.use(morgan("dev"))

server.listen(PORT)
