const express = require("express")
const req = require("express/lib/request")
const app = express()
const News = require("../models/News")

app.post("/", async (req,res) => {
    try { 
       const news = await new News ({...req.body})
       news.save(async(err, news) => {
           if (err) {
               res.status(500).json({ error: err});

               return 
           }
           res.json(news)
       })
    } catch(err) {
console.log(err)
res.status(500).json({error: err})
    }
})

app.get("/", async (req,res) => {
    try {
        const news = await News.find().exec()
        res.json(news) 

    } catch(err) {
        console.log(err)
        res.status(500).json({error: err})
    }
})

app.put("/:id_news", async (req,res) => {
    const { id_news } = req.params;
    try {
        const news = await News.findByIdAndUpdate(id_news, {$set: {...req.body}}, {new: true}).exec()
        res.json(news)
    } catch(err) {
        console.log(err)
        res.status(500).json({error: err})
    }
})

app.delete("/:id_news", async (req,res) => {
    const { id_news } = req.params;
    try { 
        await News.findByIdAndDelete(id_news).exec()
        res.json({success: "news deleted !"})
    } catch(err) {
        console.log(err)
        res.status(500).json({error: err})
    }
})

module.exports = app; 