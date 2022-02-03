const { Schema, model } = require("mongoose")

const MessageSchema = Schema({
    from: {
        type: Schema.Types.ObjectId,
        ref : "User"
    },
    to: {
        type: Schema.Types.ObjectId,
        ref : "User"
    },
    contents: {
        type: String,
    },
    conversation: {
        type: Schema.Types.ObjectId,
        ref : "Conversation"
    },
    object: {
        type: String
    }
}, {
    timestamps: true
})

MessageSchema.post("save", async (message) => {
    await Conversation.findOneAndUpdate({users: message.from, users: message.to},{$push:{conversation: message._id}},{new: true}).exec()
})

const Message = model('Message', MessageSchema)

module.exports = Message