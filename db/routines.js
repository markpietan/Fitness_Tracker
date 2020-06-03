const {client} = require("./client")


async function getAllRoutines(){

    try {
      const response = await client.query(`SELECT * FROM routines;`);
      return response.rows;
    } catch (error) {
      throw error;
    }
  }
    // select and return an array of all routines, include their activities  


async function getPublicRoutines(){
    // select and return an array of public routines, include their activities

}

async function getAllRoutinesByUser(){
    getAllRoutinesByUser({ username })
// select and return an array of all routines made by user, include their activities
}

async function getPUblicRoutinesByUser({username}){
    // select and return an array of public routines made by user, include their activities

}


async function getPublicRoutinesByActivity({activityId}){
    // select and return an array of public routines which have a specific activityId in their routine_activities join, include their activities
}

async function createRoutine({creatorId, public, name, goal}){
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





module.exports={
    getAllRoutines,
    getPublicRoutines,
    getAllRoutinesByUser,
    getPUblicRoutinesByUser,
    getPublicRoutinesByActivity,
    createRoutine,
    updateRoutine,
}