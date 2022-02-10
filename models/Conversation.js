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
  await User.updateMany(
    { _id: { $in: conversation.users }}, 
    { $push: { conversations: conversation._id }}, 
    { new: true }
  ).exec()

  // await User.where({ _id: { $in: conversation.users }}).update({ $push: { conversations: conversation.id }}, { new: true }).exec()

})

const Conversation = model('Conversation', ConversationSchema)

module.exports = Conversation