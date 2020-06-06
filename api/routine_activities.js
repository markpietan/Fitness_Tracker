const express = require("express");
const routineActivitiesRouter = express.Router();
const {
  updateRoutineActivity,
  destroyRoutineActivity,
  getRoutineActivityById,
} = require("./../db/routine_activities");
const { getAllRoutinesByUser, getRoutineById } = require("./../db/routines");
const { requireUser } = require("./utils");
routineActivitiesRouter.patch(
  "/:routineActivityId",
  requireUser,
  async function (req, res, next) {
    const routineActivityId = req.params.routineActivityId;
    const { count, duration } = req.body;
    const updateObj = {};
    if (count !== undefined) {
      updateObj.count = count;
    }
    if (duration !== undefined) {
      updateObj.duration = duration;
    }
    const routineList = await getAllRoutinesByUser(req.user);
    const { routineId } = await getRoutineActivityById(routineActivityId);
    const { creatorId } = await getRoutineById(routineId);
    console.log(creatorId);
    const isUserRoutine = routineList.some(function (element) {
      if (element.creatorId === creatorId) {
        return true;
      }
    });
    if (isUserRoutine === false) {
        next({message: "This is not your routine"})
        
    }

    const updatedroutineActivity = await updateRoutineActivity(
      routineActivityId,
      updateObj
    );
    console.log(updatedroutineActivity);
    res.send({ updatedroutineActivity });
  }
);

routineActivitiesRouter.delete(
  "/:routineActivityId",
  requireUser,
  async function (req, res, next) {
    const routineActivityId = req.params.routineActivityId;
    const routineList = await getAllRoutinesByUser(req.user);
    const { routineId } = await getRoutineActivityById(routineActivityId);
    const { creatorId } = await getRoutineById(routineId);
    console.log(creatorId);
    const isUserRoutine = routineList.some(function (element) {
      if (element.creatorId === creatorId) {
        return true;
      }
    });
    if (isUserRoutine === false) {
        next({message: "This is not your routine"})
        
    }
   await destroyRoutineActivity(routineActivityId)
   res.send({message: "Routine activity with Id: "+routineActivityId+ " was destroyed succesfully"})
 
  }
);

module.exports = routineActivitiesRouter;
