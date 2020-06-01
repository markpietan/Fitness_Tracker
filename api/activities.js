const express = require("express");
const activityRouter = express.Router();
const utilsObject = require("./utils");
const { createActivity, getAllActivities, updateActivity } = require("./../db/activities");
activityRouter.get("/", async function (req, res, next) {
  try {
    const activities = await getAllActivities();
    console.log(activities);
    res.send({ activities });
  } catch (error) {
    throw error;
  }
});

activityRouter.post("/", utilsObject.requireUser, async function (
  req,
  res,
  next
) {
  try {
    const activity = await createActivity(req.body);
    console.log(activity);
    res.send({ activity });
  } catch (error) {
    throw error;
  }
});

activityRouter.patch("/:activityId", utilsObject.requireUser, async function(req, res, next){
    const id = req.params.activityId
    const {name, description} = req.body
    const temp = {name, description, id}
    try {
        const activity = await updateActivity(temp);
        console.log(activity);
        res.send({ activity });
    } catch (error) {
        throw error
    }
})

module.exports = activityRouter;
