const express = require('express')
const router = require('express').Router()

const all = require('../controllers/testcont')

router.route("/chk").get(all.test)

module.exports = router