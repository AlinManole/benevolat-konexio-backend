const express = require("express");
const app = express();

const User = require("../models/User");
const passport = require ("../config/passport")

app.post("/signup", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email }).exec();

    if (!user) {
        user= await new User ({
            ...req.body,
        })

        user.save(async(err, user) => {
            if (err) { 
                console.log(err)
                res.status(500).json({ error: err})
                return
            }
            
            res.json(user);

        })    } else {
            res.status(409).json({ error: "user already exist"});
        } 
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

app.post("/login",
passport.authenticate("local"),
async (req,res) => {
    // console.log(req.user)
})

module.exports = app;
