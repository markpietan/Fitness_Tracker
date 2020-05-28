const { Client } = require("pg"); // imports the pg module

// supply the db name and location of the database
const client = new Client(
  process.env.DATABASE_URL || "postgres://localhost:5432/fitness-dev"
);

async function createUser(username, password) {
  try {
    let result = await client.query(
      `
INSERT INTO users (username, password) VALUES($1, $2) RETURNING *;
`,
      [username, password]
    );
    console.log(result.rows);
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
    if (result.rows.length > 0){
        return true
    } else {
        return false
    }
  } catch (error) {
    throw error;
  }
}

module.exports = {
  client,
  createUser,
  userNameExists,
};
