const { Client } = require("pg"); // imports the pg module

// supply the db name and location of the database
const client = new Client(process.env.DATABASE_URL || 'postgres://localhost:5432/fitness-dev');


module.exports = {
  client,
};