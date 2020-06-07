const { client } = require("./client");
const {generateUpdateString} = require("./../api/utils")

async function getAllActivities() {
  try {
    const response = await client.query(`SELECT * FROM activities;`);
    return response.rows;
  } catch (error) {
    throw error;
  }
}
// select and return an array of all activities

async function createActivity({ name, description }) {
  try {
    const response = await client.query(
      `  INSERT INTO activities (name, description) VALUES($1, $2) RETURNING *;`,
      [name, description]
    );
    return response.rows[0];
  } catch (error) {
    throw error;
  }
}

async function getRoutinesByActivityId(id){
  try {
    const response = await client.query(
      `SELECT routines.* FROM routines 
      JOIN routineactivities ON routines.id=routineactivities."routineId" 
      WHERE routines.public = true AND routineactivities."activityId"= $1;`,
      [id]
    );
    return response.rows;
  } catch (error) {
    throw error;
  }


}




async function updateActivity(id, fields={}){
  const psqlString = generateUpdateString(fields)
  
   if (psqlString.length === 0) {
     return;
   }
 
   try {
     const {
       rows: [activity],
     } = await client.query(
       `
         UPDATE activities
         SET ${psqlString}
         WHERE id=${id}
         RETURNING *;
       `,
       Object.values(fields)
     );
 
     return activity;
   } catch (error) {
     throw error;
   }
 
 }

module.exports = {
  getAllActivities,
  createActivity,
  updateActivity,
  getRoutinesByActivityId,
 
};
