const express = require('express')
const cors = require('cors')
require('dotenv').config();
const app = express()

app.use(express.json())
app.use(cors())
const PORT = 8080
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}...`)
})

const mongoose = require('mongoose')
const DB = process.env.MONGO_CONNECTION_STRING
mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Data base is connected')
})

const Event = require('./model/EventSchema')


app.get("/", (req, res) => {
    res.json({ test: "hello!" });
  });

// POST

app.post('/add-event', async(req,res) => {
    const newEvent = new Event(req.body)
    try{
        await newEvent.save()
        res.status(201).json({
            status: "Sucess",
            data : {
                newEvent
            }
        })
    }catch(err) {
        res.status(200).json({
            status: "failed",
            message : err
        })
    }
})