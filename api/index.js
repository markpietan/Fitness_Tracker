const express = require ("express")
const apiRouter = express.Router()
const userRouter = require("./user")
const activityRouter = require("./activities")
const routineRouter = require("./routine")
require("dotenv").config({path: "/Users/markpietan/curriculum/Fitness_Tracker/.env"})
const jwt = require("jsonwebtoken")
const {getUserById} = require("./../db/index")


apiRouter.use(async (req, res, next) => {
    const prefix = 'Bearer ';
    const auth = req.header('Authorization');
    console.log(auth)
  
  
    if (!auth) { // nothing to see here
      next();
    } else if (auth.startsWith(prefix)) {
      const token = auth.slice(prefix.length);
      console.log(token)
      console.log(process.env.JWT_SECRET)
      try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
         console.log(id)
        if (id) {
          req.user = await getUserById(id);
          console.log("user is "+req.user)
          next();
        }
      } catch ({ name, message }) {
        next({ name, message });
      }
    } else {
      next({
        name: 'AuthorizationHeaderError',
        message: `Authorization token must start with ${ prefix }`
      });
    }
  });


apiRouter.use("/users", userRouter)
apiRouter.use("/activities", activityRouter)
apiRouter.use("/routines", routineRouter)



module.exports= apiRouter