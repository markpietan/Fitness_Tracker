require("dotenv").config({path: "/Users/markpietan/curriculum/Fitness_Tracker/.env"})
const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const { createUser, getUserByUserName, getAllRoutinesByUsername } = require("../db/index");
const jsonwebtoken = require("jsonwebtoken")

userRouter.post("/login", async (req, res, next) => {
    const { username, password } = req.body;
    console.log(process.env.JWT_SECRET)
    try {
        const rows = await getUserByUserName(username)
    
       if (rows.length === 0) {
           res.send({message: "user does not exist in database"})
       }
       let hashed = rows[0].password
       const {id} = rows[0]
       console.log(username, id)
       bcrypt.compare(password, hashed, function(err, passwordsMatch) {
        if (passwordsMatch) {
        console.log("userloggedin")
        const token = jsonwebtoken.sign({username: username, id: id}, process.env.JWT_SECRET)
        console.log(token)
        req.user= {username: username, id: id}
        res.send({token})
        } else {
          throw err;
        }
      });  
    } catch (error) {
        throw error
    }
   
})
userRouter.post("/register", (req, res, next) => {
  const { username, password } = req.body;
  const SALT_COUNT = 10;
  console.log(username, password);
  if (password.length < 8){
      res.send({message: "password must be 8 characters"})
  }
  bcrypt.hash(password, SALT_COUNT, async function (err, hashedPassword) {
    console.log(hashedPassword);
    try {
      let rows = await createUser({
        username: username,
        password: hashedPassword,
      });

      res.send({ rows });
    } catch (error) {
      console.log(error);
      throw error;
    }
  });
});


userRouter.get("/:username/routines", async function(req, res, next){
  const username = req.params.username
  const rows = await getAllRoutinesByUsername(username)
  console.log(rows)
})

module.exports = userRouter;
