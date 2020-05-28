const express = require("express");
const userRouter = express.Router();

userRouter.post("/register", (req, res, next) => {
  const { username, password } = req.body;
  const SALT_COUNT = 10;

  bcrypt.hash(password, SALT_COUNT, function (err, hashedPassword) {
    createUser({
      username,
      password: hashedPassword, // not the plaintext
    });
  });
});

module.exports = userRouter;
