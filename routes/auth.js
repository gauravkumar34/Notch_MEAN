const express = require('express');
const router = express.Router();

const {signup} = require("../controllers/auth");
const { userSignupValidator } = require('../validator');

router.post("/signup", userSignupValidator, signup);

module.exports = router;