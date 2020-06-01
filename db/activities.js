const { client } = require("./client");

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

async function updateActivity({ id, name, description }) {
    try {
        const response = await client.query(
          `UPDATE activities SET name= $1, description= $2 WHERE id = $3`,
          [name, description, id]
        );
        return response.rows[0];
      } catch (error) {
        throw error;
      }
  //     don't try to update the id
  // do update the name and description
  // return the updated activity
}

module.exports = {
  getAllActivities,
  createActivity,
  updateActivity,
};
