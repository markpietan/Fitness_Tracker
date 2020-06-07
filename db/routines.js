const { client } = require("./client");
const { generateUpdateString } = require("./../api/utils");
const { getUserByUserName } = require("./users");
async function getAllRoutines() {
  // also get all activities
  try {
    const response = await client.query(`SELECT * FROM routines;`);
    return response.rows;
  } catch (error) {
    throw error;
  }
}
// select and return an array of all routines, include their activities

async function getPublicRoutines() {
  try {
    const response = await client.query(
      `SELECT routines.*, routineactivities.duration, routineactivities.count, 
      activities.* FROM routines 
      JOIN routineactivities ON routines.id=routineactivities."routineId" 
      JOIN activities ON activities.id=routineactivities."activityId"
      WHERE routines.public = true;`
    );
    console.log(response);
    return response.rows;
  } catch (error) {
    throw error;
  }
  // select and return an array of public routines, include their activities
}

async function getAllRoutinesByUser({ id }) {
  try {
    const response = await client.query(
      `SELECT * FROM routines WHERE "creatorId" = $1;`,
      [id]
    );
    return response.rows;
  } catch (error) {
    throw error;
  }
  // select and return an array of all routines made by user, include their activities
}

async function getPublicRoutinesByUser({ username }) {
  // select and return an array of public routines made by user, include their activities
  try {
    const [user] = await getUserByUserName(username);
    console.log(user);
    const response = await client.query(
      `SELECT * FROM routines WHERE "creatorId" = $1 AND public = TRUE;`,
      [user.id]
    );
    return response.rows;
  } catch (error) {
    throw error;
  }
}

async function getRoutineById(id) {
  try {
    let result = await client.query(
      `
          SELECT * FROM routines WHERE id = $1;
          `,
      [id]
    );
    console.log(result.rows);

    return result.rows[0];
  } catch (error) {
    throw error;
  }
}

async function getPublicRoutinesByActivity({ activityId }) {
  // select and return an array of public routines which have a specific activityId in their routine_activities join, include their activities
}

async function createRoutine({ creatorId, public, name, goal }) {
  try {
    const response = await client.query(
      `  INSERT INTO routines ("creatorId", public, name, goal) VALUES($1, $2, $3, $4) RETURNING *;`,
      [creatorId, public, name, goal]
    );
    return response.rows[0];
  } catch (error) {
    throw error;
  }
}
// create and return the new routine

//     Find the routine with id equal to the passed in id
// Don't update the routine id, but do update the public status, name, or goal, as necessary
// Return the updated routine

async function destroyRoutineById(id) {
  try {
    let result = await client.query(
      `
            DELETE FROM routines WHERE id = $1;
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

async function updateRoutine(id, fields = {}) {
  const psqlString = generateUpdateString(fields);

  if (psqlString.length === 0) {
    return;
  }

  try {
    const {
      rows: [routine],
    } = await client.query(
      `
        UPDATE routines
        SET ${psqlString}
        WHERE id=${id}
        RETURNING *;
      `,
      Object.values(fields)
    );

    return routine;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllRoutines,
  getPublicRoutines,
  getAllRoutinesByUser,
  getPublicRoutinesByUser,
  getPublicRoutinesByActivity,
  createRoutine,
  updateRoutine,
  getRoutineById,
  destroyRoutineById,
};
