const { client } = require("./client");

async function createUser({ username, password }) {
  try {
    console.log(username, password);
    let result = await client.query(
      `
  INSERT INTO users (username, password) VALUES($1, $2) RETURNING *;
  `,
      [username, password]
    );
    console.log(result.rows);
    return result.rows;
  } catch (error) {
    throw error;
  }
}

async function userNameExists(username) {
  try {
    let result = await client.query(
      `
      SELECT * FROM users WHERE username = $1
      `,
      [username]
    );
    console.log(result.rows);
    if (result.rows.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
}

async function getUserByUserName(username) {
  try {
    let result = await client.query(
      `
          SELECT * FROM users WHERE username = $1
          `,
      [username]
    );
    console.log(result.rows);

    return result.rows;
  } catch (error) {
    throw error;
  }
}

async function getAllRoutinesByUsername(username) {
  try {
    let rows = await getUserByUserName(username);
    let user = rows[0];

    let result = await client.query(
      `
        SELECT * FROM routines WHERE "creatorId" = $1
        `,
      [user.id]
    );
    console.log(result.rows);

    return result.rows;
  } catch (error) {
    throw error;
  }
}

async function getUserById(id) {
  try {
    let result = await client.query(
      `
            SELECT * FROM users WHERE id = $1
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
  createUser,
  userNameExists,
  getUserByUserName,
  getUserById,
  getAllRoutinesByUsername,
};
