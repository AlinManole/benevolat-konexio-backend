const express = require("express")
const app = express()
const Message = require("../models/Message")

app.post("/", async (req,res) => {
try {
    const message = await new Message({...req.body})
    message.save(async(err, message) => {
        if (err) {
            res.status(500).json({error: err})
            return;
        }
        res.json(message)
    })
} catch(err) {
    console.log(err)
    res.status(500).json({error: err})
}
});

app.get("/", async (req,res)=>{
    try{
        const message = await Message.find().exec()
        res.json(message) 
    } catch (err) {
    console.log(err)
    res.status(500).json({error: err})
    }
})

app.get("/:id_message", async(req, res) => {
    const { id_message } = req.params
    try{
        const message = await Message.findById(id_message).populate("from").populate("to").exec()
        res.json(message)
    } catch (err) {
        console.log(err)
        res.status(500).json({error: err})
    }
})

app.delete("/:id_message", async(req,res)=>{
    const { id_message } = req.params
    try {
        await Message.findByIdAndDelete(id_message).exec()
        res.json({success: "message deleted !"})
 
    } catch (err) { 
        console.log(err)
        res.status(500).json({error: err})
    }
})



module.exports = app;