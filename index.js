const express = require('express')
const app = express()
const port = 5000
require('dotenv').config()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const cors = require('cors')

const dbUrl = process.env.DATABASE

app.use(express.json())

const auth = require ("./routes/auth")
const user = require('./routes/user')
const news = require("./routes/news")
const program = require("./routes/program")
const cour = require("./routes/cour")

mongoose.connect(dbUrl)
const db = mongoose.connection

db.on('error', (err) => {
  console.log(err)
})

db.once('open', () => {
  console.log(`Connection to database established`)
})

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: false
}))

app.use(cors({
  origin: process.env.WEBSITE,
  credentials: true
}))

app.use(passport.initialize())
app.use(passport.session()) 

app.use("/user", user)
app.use("/auth", auth)
app.use("/news", news)
app.use("/program", program)
app.use("/cour", cour)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})