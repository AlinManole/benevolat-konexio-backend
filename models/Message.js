const { Schema, model } = require("mongoose")

const MessageSchema = Schema({
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


const Message = model('Message', MessageSchema)

module.exports = Message