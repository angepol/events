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

const EventBook = require('./model/EventBook')


app.get("/", (req, res) => {
    res.json({ test: "hello!" });
  });

// Post is now working
app.post('/add-event', async(req,res) => {
    const newEvent = new EventBook(req.body)
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


// Get events is working

app.get('/get-events', async (req,res) => {
    const events = await EventBook.find({})
    try{
        res.status(200).json({
            status : 'Success',
            data : {
                events
            }
        })
    }catch(err){
        res.status(500).json({
            status: 'Failed',
            message : err
        })
    }
})


// showsingle event

app.get('/:id', async (req,res) => {
    const singleEvent  = await EventBook.findById(req.params.id)
    try{
        res.status(200).json({
            status : 'Success',
            data : {
                singleEvent
            }
        })
    }catch(err){
        res.status(500).json({
            status: 'Failed',
            message : err
        })
      }
})

// update is now working
app.patch('/update-event/:id', async (req,res) => {
    const updatedEvent = await EventBook.findByIdAndUpdate(req.params.id,req.body,{
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

// delete is now working
app.delete('/delete-event/:id', async(req,res) => {
    await EventBook.findByIdAndDelete(req.params.id)
    
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