const User = require("../models/user");
const { errorHandler } = require("../helpers/dbErrorHandler");
const jwt = require("jsonwebtoken"); //to genetrate signed token
const expressJwt = require("express-jwt"); //for authorization check.

exports.signup = (req, res) => {
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: errorHandler(err)
      });
    }
    user.salt = undefined;
    user.hashed_password = undefined;
    res.json({
      user,
    });
  });
};

exports.signin = (req, res)=> {
  const {email, password} = req.body;
  User.findOne({email},(err, user)=>{
    if(err || !user){
      return res.status(400).json({
        err: "User with that email does not exist. Please signup",
      })
    }
    if(!user.authenticate(password)){
      return res.status(401).json({
        error : "Email and password does not match",
      });
    }
    const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET);
    res.cookie("t", token,{expire : new Date() + 9999});
    const {_id, name, email, role} = user;
    return res.json({status:"SUCCESS",code:200, data:{_id,email, name, role,token}});
  });
};

exports.signout = (req, res) => {
  res.clearCookie("t");
  res.json({ message: "Signout success" });
};
