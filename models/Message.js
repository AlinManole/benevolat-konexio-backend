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


const Message = model('Message', MessageSchema)

module.exports = Message