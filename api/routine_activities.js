const express = require("express");
const routineActivitiesRouter = express.Router();
const {updateRoutineActivity, destroyRoutineActivity} = require("./../db/routine_activities")
const {requireUser} = require("./utils")
routineActivitiesRouter.patch("/:routineActivityId", requireUser, async function (req, res, next){
    const routineActivityId = req.params.routineActivityId
    const {count, duration} = req.body
    const updateObj = {}
    if (count !== undefined) {
        updateObj.count = count
    }
    if (duration !== undefined) {
        updateObj.duration = duration
    }
    const updatedroutineActivity = await updateRoutineActivity(routineActivityId, updateObj)
    console.log(updatedroutineActivity)
    res.send({updatedroutineActivity})
})

module.exports = routineActivitiesRouter