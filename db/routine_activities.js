const { client } = require("./client");
const { createActivity } = require("./activities");
const { generateUpdateString } = require("./../api/utils");

async function addActivityToRoutine({
  routineId,
  activityId,
  count = 0,
  duration = 0,
}) {
  try {
    const response = await client.query(
      `
      INSERT INTO routineactivities("routineId", "activityId", count, duration)
      VALUES($1, $2, $3, $4)
      RETURNING *;
      `,
      [routineId, activityId, count, duration]
    );
    return response.rows;
  } catch (error) {
    throw error;
  }
  // create a new routine_activity, and return it
}

async function updateRoutineActivity(id, fields = {}) {
  const psqlString = generateUpdateString(fields);

  if (psqlString.length === 0) {
    return;
  }

  try {
    const {
      rows: [routineactivity],
    } = await client.query(
      `
          UPDATE routineactivities
          SET ${psqlString}
          WHERE id=${id}
          RETURNING *;
        `,
      Object.values(fields)
    );

    return routineactivity;
  } catch (error) {
    throw error;
  }
  // Find the routine with id equal to the passed in id
  // Update the count or duration as necessary
}

async function destroyRoutineActivity(id) {
  try {
    let result = await client.query(
      `
            DELETE FROM routineactivities WHERE id = $1;
            `,
      [id]
    );
    console.log(result.rows);

    return result.rows[0];
  } catch (error) {
    throw error;
  }
  // destroyRoutineActivity(id)
  // remove routine_activity from database
}

async function destroyRoutineActivityByRoutineId(id) {
  try {
    let result = await client.query(
      `
            DELETE FROM routineactivities WHERE "routineId" = $1;
            `,
      [id]
    );
    console.log(result.rows);

    return result.rows[0];
  } catch (error) {
    throw error;
  }
  // destroyRoutineActivity(id)
  // remove routine_activity from database
}

async function getRoutineActivityById(id) {
  try {
    let result = await client.query(
      `
          SELECT * FROM routineactivities WHERE id = $1;
          `,
      [id]
    );
    console.log(result.rows);

    return result.rows[0];
  } catch (error) {
    throw error;
  }
}

module.exports = {
  addActivityToRoutine,
  updateRoutineActivity,
  destroyRoutineActivity,
  getRoutineActivityById,
  destroyRoutineActivityByRoutineId,
};

/* 
does add activity to routine require us to create a new activity or does it require the user to pass in the id of a already exisiting activity
Is addActivityToRoutine the only way to add activities to a routine (should it be possible when we create a routine)
for Patch for Routines- do we need to be able to update the activities as well.....
*/
