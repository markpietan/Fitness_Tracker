const express = require("express");
const routineRouter = express.Router();
const {
  getAllRoutines,
  createRoutine,
  updateRoutine,
} = require("./../db/routines");
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

routineRouter.post("/:routineId/activities", async function (req, res, next) {
  const routineId = req.params.routineId;
  const { name, description } = req.body;
  console.log(name, description);
  if (name === undefined || description === undefined) {
    next({
      message: "Must supply name and description for activity",
    });
  }
 
});

module.exports = routineRouter;
