const passport = require('passport');

var GoogleStrategy = require('passport-google-oauth20').Strategy;



passport.serializeUser((user, done) => {
  done(null, user.id); 
})
passport.deserializeUser((user, done)=>{
  done(null, user);
})

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile)
    cb(null, profile)
  }
));
