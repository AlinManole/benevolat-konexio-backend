const { Schema, model } = require("mongoose")

const CoursSchema = Schema({
    program: {
        type: Schema.Types.ObjectId,
        ref: "Program"
    },
    days: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        date: {
            type: Date
        }
    }],
    numberOfPlace: {
        type: Number
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    users: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    level: {
        type: String
    },
    adress: {
        type: String
    }
}, {
    timestamps: true
})

const Cours = model('Cours', CoursSchema)

module.exports = Cours