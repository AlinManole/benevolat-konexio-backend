const express = require("express")
const app = express()

const User = require("../models/User")

app.post("/signup", async (req,res) => {
    try {
        
    } catch (err){
        console.log(err)
        res.status(500).json({error:err})
    }
})

module.exports = app;
