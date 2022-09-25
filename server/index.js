require('dotenv').config()
const express = require("express")
const cors = require('cors')
const mongoose = require('mongoose')
const routes = require('./routes/studentRoutes')
const app = express()

const port = process.env.PORT || 3002
mongoose.connect(process.env.DBURI, { useNewUrlParser: true, useUnifiedTopology: true, }, () => {
    console.log("Connected to Database")
});

app.use(cors())
app.use(express.json())
app.use('/api/students', routes)

app.listen(port, () => {
    console.log("server started at " + port)
})