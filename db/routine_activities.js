const {client} = require("./client")

async function addActivityToRoutine({routineId, activityId, count, duration}){
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