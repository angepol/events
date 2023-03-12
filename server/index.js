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
