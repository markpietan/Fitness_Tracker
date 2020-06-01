const {client} = require("./client")


async function getAllRoutines(){
    // select and return an array of all routines, include their activities  
}

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
    // create and return the new routine


}

async function updateRoutine({id, public, name, goal}){
//     Find the routine with id equal to the passed in id
// Don't update the routine id, but do update the public status, name, or goal, as necessary
// Return the updated routine
}

module.exports={
    getAllRoutines,
    getPublicRoutines,
    getAllRoutinesByUser,
    getPUblicRoutinesByUser,
    getPublicRoutinesByActivity,
    createRoutine,
    updateRoutine,
}