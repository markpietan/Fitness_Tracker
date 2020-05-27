const { client } = require("./index.js");
client.connect();
async function createTables() {
  try {
    let result = await client.query(`
        CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
         );
         CREATE TABLE activities(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) UNIQUE NOT NULL,
            description TEXT NOT NULL,
         );
         CREATE TABLE routines(
            id SERIAL PRIMARY KEY,
            "creatorId" INTEGER REFERENCES user(id),
            public BOOLEAN DEFAULT false,
            name VSARCHAR(255) UNIQUE NOT NULL,
            goal TEXT NOT NULL,
         );
         CREATE TABLE routineActivities(
            id SERIAL PRIMARY KEY,
            "routineId" INTEGER REFERENCES routines(id),
            "activityId" INTEGER REFERENCES activity(id),
            duration INTEGER,
            count INTEGER,
        );`);
    console.log(result.rows[0]);
  } catch (error) {
    console.error(error);
  }
}
async function testDb() {
  await createTables();
}
testDb()
  .then(function (res) {
    console.log(res);
    client.end();
  })
  .catch(function (error) {
    console.error(error);
  });
console.log("made it!");
