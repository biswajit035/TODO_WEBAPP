const Users = require('../schema/Users')
const jwt = require('jsonwebtoken')
const JWT = process.env.JWT_SECRET_KEY
var bcrypt = require('bcryptjs');

async function signup(req, res) {
   const { name, email, password } = req.body
   try {
      let user = await Users.findOne({ email })
      // Users already exists
      if (user)
         res.status(409).send({ "msg": "email id already exists" })

      // create user
      // salted the password
      const salt = await bcrypt.genSalt(10);
      const secPassword = await bcrypt.hash(req.body.password, salt)
      user = await Users.create({
         name, email, password: secPassword
      })
      const token = jwt.sign({
         userId: user._id,
         username: user.name.split(" ")[0]
      }, JWT);
      res.status(201).send({ "msg": "Successfuly created you account", token })

   } catch (error) {
      console.log(error);
   }

}
async function login(req, res) {
   const { email, password } = req.body
   try {
      let user = await Users.findOne({ email })
      // Users already exists
      if (!user) {
         res.status(404).send({ "msg": "user does not exists" })
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (passwordCompare)
      {
         const token = jwt.sign({
            userId: user._id,
            username: user.name.split(" ")[0]
         }, JWT);
         res.status(201).send({ "msg": "Successfuly logged in",token })
      }
      res.status(401).send({ "msg": "credentials does not match" })


   } catch (error) {
      console.log(error);
   }

}
module.exports = { login, signup }
