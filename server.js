require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const expressValidator = require("express-validator");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
// import route
const authRoutes = require("./routes/auth");
const app = express();
require("./config/passport.config");

app.use(passport.initialize());
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connect"));

//middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());
//route middleware
app.use("/api", authRoutes);
app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/api/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  //res.redirect('/');
  res.end('Logged in!');
})

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log("Server is running on port : " + port);
});
