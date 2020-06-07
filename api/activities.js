const express = require("express");
const activityRouter = express.Router();
const utilsObject = require("./utils");
const {
  createActivity,
  getAllActivities,
  updateActivity,
  getRoutinesByActivityId,
} = require("./../db/activities");
activityRouter.get("/", async function (req, res, next) {
  try {
    const activities = await getAllActivities();
    console.log(activities);
    res.send({ activities });
  } catch (error) {
    throw error;
  }
});

activityRouter.get("/:activityId/routines", async function(req, res, next) {
const activityId = req.params.activityId
const rows = await getRoutinesByActivityId(activityId)
console.log(rows)
res.send({rows})
})


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

activityRouter.patch("/:activityId", utilsObject.requireUser, async function (
  req,
  res,
  next
) {
  const id = req.params.activityId;
  const { name, description } = req.body;
  const temp = {};
  if (name !== undefined) {
    temp.name = name;
  }
  if (description !== undefined) {
    temp.description = description;
  }
  const activity = await updateActivity(id, temp);
  console.log(activity);
  res.send({ activity });
});

module.exports = activityRouter;
