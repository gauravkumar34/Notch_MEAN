const express = require('express');
const router = express.Router();
const passport = require('passport');
const {signup, signin, signout, socialLogin} = require("../controllers/auth");
const { userSignupValidator } = require('../validator');

require('../config/passport.config')

router.post("/signup", userSignupValidator, signup);
router.post("/signin", signin);
router.get("/signout", signout);
router.post("/socaillogin", socialLogin);
router.get('/google', passport.authenticate('google',{scope : ['profile', 'email']}));
router.get('/google/callback', passport.authenticate('google',{failureRedirect :'/signin'}),
    (req, res)=>{
        // res.redirect('/');
        res.end('Logged in!')
    }
)
module.exports = router;