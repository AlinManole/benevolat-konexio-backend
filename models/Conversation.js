const { Schema, model } = require("mongoose")

const ConversationSchema = Schema({ 
users: [{
  type: Schema.Types.ObjectId,
  ref : "User"
}]
,
messages: [{
  type: Schema.Types.ObjectId,
  ref : "Message"
}]
},{
  timestamps: true
})


const User = model('Conversation', ConversationSchema)

module.exports = Conversation