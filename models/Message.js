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
    const existingConversation = await Conversation.findOne({ users: message.from, users: message.to }).exec()

    console.log(existingConversation);

    if(existingConversation) {
        await Conversation.findOneAndUpdate({users: message.from, users: message.to}, {$push:{messages: message._id}},{new: true}).exec()
    } else {
        const newConversation = await new Conversation({
            users: [ message.from, message.to ],
            messages: [message._id]
        })

        newConversation.save( async (err, conversation) => {
            if (err) {
                console.log(err)
                res.status(500).json({ error: err })
                return
            }
            res.json(conversation)
        })

        message.conversation = newConversation._id

        message.save()
    }
})

const Message = model('Message', MessageSchema)

module.exports = Message