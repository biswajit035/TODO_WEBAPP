const Users = require('../schema/Users')
const jwt = require('jsonwebtoken')
const JWT = process.env.JWT_SECRET_KEY
var bcrypt = require('bcryptjs');


//  user signup
async function signup(req, res) {

   // destructuring data
   const { name, email, password } = req.body
   try {
      let user = await Users.findOne({ email })

      // Users already exists
      if (user)
         res.status(409).send({ "msg": "email id already exists" })

      // salted the password
      const salt = await bcrypt.genSalt(10);
      const secPassword = await bcrypt.hash(password, salt)

      // create user
      user = await Users.create({
         name, email, password: secPassword
      })

      // generate token
      const token = jwt.sign({
         userId: user._id,
         username: user.name.split(" ")[0]
      }, JWT);
      
      // send the token and status with msg
      res.status(201).send({ "msg": "Successfuly created you account", token })
   } catch (error) {
      console.log(error);
   }
}

// user login
async function login(req, res) {
   // destructuring data
   const { email, password } = req.body
   try {
      let user = await Users.findOne({ email })

      // Users already exists
      if (!user) {
         res.status(404).send({ "msg": "user does not exists" })
      }

      // comparing hashed password
      const passwordCompare = await bcrypt.compare(password, user.password);

      // if password matched
      if (passwordCompare) {
         const token = jwt.sign({
            userId: user._id,
            username: user.name.split(" ")[0]
         }, JWT);

         // send the token and status with msg
         res.status(201).send({ "msg": "Successfuly logged in", token })
      }
      
      // if password does not matched
      res.status(401).send({ "msg": "credentials does not match" })
   } catch (error) {
      console.log(error);
   }
}

module.exports = { login, signup }
