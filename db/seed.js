const { client, createUser, userNameExists } = require("./index.js");
client.connect();
async function createTables() {
  try {
    let result = await client.query(`
        CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
         );
         CREATE TABLE activities(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) UNIQUE NOT NULL,
            description TEXT NOT NULL
         );
         CREATE TABLE routines(
            id SERIAL PRIMARY KEY,
            "creatorId" INTEGER REFERENCES users(id),
            public BOOLEAN DEFAULT false,
            name VARCHAR(255) UNIQUE NOT NULL,
            goal TEXT NOT NULL
         );
         CREATE TABLE routineActivities(
            id SERIAL PRIMARY KEY,
            "routineId" INTEGER REFERENCES routines(id),
            "activityId" INTEGER REFERENCES activities(id),
            duration INTEGER,
            count INTEGER,
            UNIQUE ("routineId", "activityId")
        );`);
    // console.log(result);
  } catch (error) {
    console.error(error);
  }
}

async function dropTables() {
  try {
    let result = await client.query(`
      DROP TABLE IF EXISTS routineActivities;
      DROP TABLE IF EXISTS routines;
      DROP TABLE IF EXISTS activities;
      DROP TABLE IF EXISTS users; `);
    // console.log(result);
  } catch (error) {
    console.error(error);
  }
}

async function testDb() {
  await dropTables();
  await createTables();
  // await createUser({ username: "Bob", password: "1234" });
  // let test = await userNameExists("Bob");
  // git add .
}
testDb()
  .then(function (res) {
    // console.log(res);
  })
  .catch(function (error) {
    console.error(error);
  })
  .finally(function () {
    client.end();
  });
console.log("made it!");
