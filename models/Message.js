const res = require("express/lib/response")
const { Schema, model } = require("mongoose")
const Conversation = require("./Conversation")

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
    const existingConversation = await Conversation.findOne({ users: [message.from, message.to] }).exec()

    console.log(existingConversation);

    if(existingConversation) {
        const existingMessage = await Conversation.findOne({$in: { messages: message._id }}).exec()
        if(!existingMessage) {
            await Conversation.findOneAndUpdate({users: [message.from, message.to]}, { $push: { messages: message._id }},{new: true}).exec()
            message.conversation = existingConversation._id
    
            message.save()
        }
    } else {
        const newConversation = new Conversation({
            users: [ message.from, message.to ],
            messages: [message._id]
        })
        const newConversationsaved = newConversation.save()

        message.conversation = newConversationsaved._id

        message.save()
    }
})

const Message = model('Message', MessageSchema)

module.exports = Message