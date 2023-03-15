const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema({
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
  },
})

const Event = mongoose.model('Event', EventSchema)

module.exports = Event