const {client} = require("./client")
const {createActivity} = require("./activities")
async function addActivityToRoutine({routineId, activityId, count, duration}){
    try {
      const newActivity = await createActivity({name})
      const response = client.query(`
      INSERT INTO routineactivities("routineId", "activityId", count, duration)
      VALUES($1, $2, $3, $4)
      ON CONFLICT ("routineId", "activityId") DO NOTHING 
      RETURNING *
      `)  
      return response.rows[0]
    } catch (error) {
      throw error  
    }
    // create a new routine_activity, and return it
}

async function updateRoutineActivity({id, count, duration}){
    // Find the routine with id equal to the passed in id
    // Update the count or duration as necessary

}

async function destroyRoutineActivity(id){
    // destroyRoutineActivity(id)
    // remove routine_activity from database
}


module.exports={
    addActivityToRoutine,
    updateRoutineActivity,
    destroyRoutineActivity,
}

/* 
does add activity to routine require us to create a new activity or does it require the user to pass in the id of a already exisiting activity
Is addActivityToRoutine the only way to add activities to a routine(should it be possible when we create a routine)
for Patch for Routines- do we need to be able to update the activities as well.....
*/