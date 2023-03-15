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

// GET
app.get('./get-event', async (req,res) => {
    const events = await EventSchema.find({})
try{
    res.status(200).json({
        status : 'Success',
        data : {
            eventSchema
        }
    })
}catch(err){
    res.status(500).json({
        status: 'Failed',
        message : err
    })
  }
})

// UPDATE
app.patch('/update-phone/:id', async (req,res) => {
    const updatedEvent = await EventSchema.findByIdAndUpdate(req.params.id,req.body,{
        new : true,
        runValidators : true
      })
    try{
        res.status(200).json({
            status : 'Success',
            data : {
                updatedEvent
            }
          })
    }catch(err){
        console.log(err)
    }
})


app.delete('/delete-event/:id', async(req,res) => {
    await EventSchema.findByIdAndDelete(req.params.id)
    
    try{
      res.status(204).json({
          status : 'Success',
          data : {}
      })
    }catch(err){
        res.status(500).json({
            status: 'Failed',
            message : err
        })
    }
})