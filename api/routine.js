const express = require("express");
const routineRouter = express.Router();
const {
  getAllRoutines,
  createRoutine,
  updateRoutine,
  getAllRoutinesByUser,
} = require("./../db/routines");

const {
  addActivityToRoutine,
  } = require("./../db/routine_activities");


const { requireUser } = require("./utils.js");

routineRouter.get("/", async function (req, res, next) {
  const rows = await getAllRoutines();
  console.log(rows);
  res.send({ rows });
});

routineRouter.post("/", requireUser, async function (req, res, next) {
  const { public, name, goal } = req.body;
  const id = req.user.id;
  const tempObj = {
    public,
    name,
    goal,
    creatorId: id,
  };

  const response = await createRoutine(tempObj);
  console.log(response);
});

routineRouter.patch("/:routineId", requireUser, async function (
  req,
  res,
  next
) {
  const routineId = req.params.routineId;
  const { public, name, goal } = req.body;
  console.log(public, name, goal, routineId);
  const userRoutines = await getAllRoutinesByUser(req.user)
  const isUserRoutine =userRoutines.some(element => {
    if (element.id === Number(routineId)) {
        return true
    }
  });
  if (isUserRoutine === false) {
      next({message: "This is not your routine"})
  }
 
  updateObj = {};
  if (public !== undefined) {
    updateObj.public = public;
  }
  if (name !== undefined) {
    updateObj.name = name;
  }
  if (goal !== undefined) {
    updateObj.goal = goal;
  }
  console.log(updateObj);
  const response = await updateRoutine(routineId, updateObj);
  res.send({ response });
});
// routineId, activityId, count, duration
routineRouter.post("/:routineId/activities", async function (req, res, next) {
  const routineId = req.params.routineId;
  const { activityId, count, duration } = req.body;
  console.log(activityId);
  if (activityId === undefined || routineId === undefined) {
    next({
      message: "Must supply name and description for activity",
    });
  }
  const routineActivityObj = {
    activityId,
    count,
    duration,
    routineId,

  }
 const routineActivity = await addActivityToRoutine(routineActivityObj)
 console.log(routineActivity)
 res.send({routineActivity})
});

module.exports = routineRouter;
