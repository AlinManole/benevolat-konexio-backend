const { Schema, model } = require("mongoose")

const NewsSchema = Schema({
    title: {
        type: String
    },
    content: {
        type: String
    },
    status: {
        type: String
    }
}, {
    timestamps: true
})


const News = model('News', NewsSchema)

module.exports = News