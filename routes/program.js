const express = require("express")
const app = express()
const Program = require("../models/Program")


app.post ("/", async(req,res) => {
    try {
        const program = await new Program ({...req.body})
        program.save(async(err, program) => { 
            if (err) {
                res.status(500).json({error: err})

                return 
            }
            res.json(program)
        })
    } catch(err) {
        console.log(err)
        res.status(500).json({error: err})
    }
})

app.get ("/", async (req,res) => {
    try {
        const programs = await Program.find().exec()
        res.json(programs)
    } catch(err) {
        console.log(err)
        res.status(500).json({error: err})
    }
})


module.exports = app;