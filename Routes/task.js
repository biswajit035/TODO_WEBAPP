const express = require('express')
const router = require('express').Router()
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const auth = require('../controllers/auth')
const task = require('../controllers/task')
const check = require('../middleware/verify')


router.route("/add").post(urlencodedParser,check.verifyUser,task.add)
router.route("/edit").put(urlencodedParser, check.verifyUser,task.edit)
router.route("/fetch").get(check.verifyUser,task.fetch)
router.route("/remove").delete(check.verifyUser,task.remove)

module.exports = router