const express = require('express')
const router = require('express').Router()
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const auth = require('../controllers/auth')


router.route("/login").post(urlencodedParser,auth.login)
router.route("/signup").post(urlencodedParser,auth.signup)

module.exports = router