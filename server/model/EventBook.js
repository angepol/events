const mongoose = require('mongoose')

const EventBookSchema = new mongoose.Schema({
 eventName : {
        type : String,
        required : true
    },
  where: {
    type : String,
    required : true
  },
  description: {
    type : String,
    required : true
  }
})

const EventBook = mongoose.model('EventBook', EventBookSchema)

module.exports = EventBook