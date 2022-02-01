const { Schema, model } = require("mongoose")

const UserSchema = Schema({
    from: {
        type: Object
    },
    to: {
        type: Object
    },
    contents: {
        type: String,
    },
    conversation: {
        type: Object
    },
    object: {
        type: String
    }
}, {
    timestamps: true
})


const User = model('Conversation', ConversationSchema)

module.exports = Conversation