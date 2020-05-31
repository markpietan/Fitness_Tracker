const express = require("express")
const activityRouter = express.Router()
const utilsObject = require("./utils")
activityRouter.post("/activities", function(rec, res, next){
res.send({message: "Hey its a message"})


})



module.exports= activityRouter