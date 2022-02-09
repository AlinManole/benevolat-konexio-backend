const { Schema, model } = require("mongoose")
const User = require("./User")

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

ConversationSchema.post("save", async (conversation) => {
  // const admin = await User.findOne({role:"admin"}).exec()
  await User.updateMany({users: conversation.users }, {$push: {conversation: conversation._id }}, { new: true }).exec()

})

const Conversation = model('Conversation', ConversationSchema)

module.exports = Conversation