const express = require("express");
const routineRouter = express.Router();
const { getAllRoutines, createRoutine } = require("./../db/routines");
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

  const response = await createRoutine(tempObj)
  console.log(response)
});

module.exports = routineRouter;
